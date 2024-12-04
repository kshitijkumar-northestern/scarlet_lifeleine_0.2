package com.scarletlifeline.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI scarletLifelineAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Scarlet Lifeline API")
                        .description("Blood Donation Management System API Documentation")
                        .version("1.0.0"));
    }
}