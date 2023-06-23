FROM bitnami/dotnet-sdk:7.0.305

ARG connection_string
ARG aspnetcore_urls="http://0.0.0.0:5000"

ENV ConnectionStrings__SNSDb="${connection_string}"
ENV ASPNETCORE_URLS=${aspnetcore_urls} 

copy . /app/

CMD ["dotnet", "/app/SNS.PL.dll"]
