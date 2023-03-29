using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Writers;
using SNS_API.Helpers.ArgHelper;
using SNS_BLA;
using SNS_BLA.Services.UserService;
using SNS_DLA;
using SNS_DLA.Data;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.Entities;
using System.Security.Claims;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<SNSDbContext>();
builder.Services.AddControllers();

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequiredLength = 8;
}).AddEntityFrameworkStores<SNSDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        RequireExpirationTime = true,
        ValidIssuer = configuration["AuthSettings:Issuer"],
        ValidAudience = configuration["AuthSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AuthSettings:Key"])),
        ValidateIssuerSigningKey = true,
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CustomerOnly", policy => policy.RequireClaim(ClaimTypes.Role, "Customer"));
    options.AddPolicy("EmployeeOnly", policy => policy.RequireClaim(ClaimTypes.Role, "Employee"));
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim(ClaimTypes.Role, "Admin"));
    options.AddPolicy("CustomerOrEmployee", policy =>
    {
        policy.RequireAssertion(context => context.User.HasClaim(c =>
        (c.Type == ClaimTypes.Role) && (c.Value == "Customer" || c.Value == "Employee")));
    });
    options.AddPolicy("AdminOrEmployee", policy =>
    {
        policy.RequireAssertion(context => context.User.HasClaim(c =>
        (c.Type == ClaimTypes.Role) && (c.Value == "Admin" || c.Value == "Employee")));
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDataAccess();
builder.Services.AddBusinessAccess();

var app = builder.Build();

//Add admin in terminal
foreach (var argument in args)
{
    Console.WriteLine(argument);
    if (argument == "--addSuperuser")
    {
        using var scope = app.Services.CreateScope();

        var services = scope.ServiceProvider;

        var authService = services.GetRequiredService<IAuthService>();

        var argHandler = new ArgHandler(authService);

        var result = await argHandler.AddAdmin();

        if (!result.IsSuccess)
        {
            Console.WriteLine("Admin registration failed.");
            Environment.Exit(-1);
        }

        Console.WriteLine("Admin added successfully");
        Environment.Exit(0);
    }
};

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


