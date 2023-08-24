using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Writers;
using SNS_API.Helpers.ArgHelper.AdminHelper;
using SNS_API.Helpers.ArgHelper.CategoryHelper;
using SNS_API.Helpers.ArgHelper.ProductHelper;
using SNS_BLA;
using SNS_BLA.Services.CategoryService;
using SNS_BLA.Services.ProductService;
using SNS_BLA.Services.UserService;
using SNS_DLA;
using SNS_DLA.Data;
using SNS_DLA.Models.DTO_s.Request;
using SNS_DLA.Models.Entities;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<SNSDbContext>(
    o => o.UseNpgsql(builder.Configuration.GetConnectionString("SNSDb"))
);
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
    using var scope = app.Services.CreateScope();

    var services = scope.ServiceProvider;

    Console.WriteLine(argument);

    if (argument == "--addSuperuser")
    {
        var authService = services.GetRequiredService<IAuthService>();

        var argHandler = new AdminHandler(authService);

        var result = await argHandler.AddAdmin();

        if (!result.IsSuccess)
        {
            Console.WriteLine("Admin registration failed.");
            Environment.Exit(-1);
        }

        Console.WriteLine("Admin added successfully");
        Environment.Exit(0);
    }

    if (argument == "--seedDatabase")
    {
        var categoryService = services.GetRequiredService<ICategoryService>();

        var categoryHandler = new CategoryHandler(categoryService);
        var isSuccess = await categoryHandler.AddDefaultCategories();

        if (!isSuccess)
        {
            Console.WriteLine("Failed category addition.");
            Environment.Exit(-1);
        }

        var productService = services.GetRequiredService<IProductService>();

        var productHandler = new ProductHandler(productService);
        isSuccess = await productHandler.AddDefaultProducts();

        if (!isSuccess)
        {
            Console.WriteLine("Failed product addition.");
            Environment.Exit(-1);
        }

        Console.WriteLine("Database items added");
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


