
        package com.scarletlifeline.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@Document(collection = "admins")
public class Admin {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;
    private String password;
    private String name;
    private String email;
}