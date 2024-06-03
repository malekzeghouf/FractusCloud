package tn.esprit.pidev.entities.Enumeration;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin: read"),
    ADMIN_UPDATE("admin: update"),
    ADMIN_CREATE("admin: create"),
    ADMIN_DELETE("admin: delete"),
    ADMIN_PATCH("admin: patch"),

    USER_READ("user: read"),
    USER_UPDATE("user: update"),
    USER_CREATE("user: create"),
    USER_PATCH("user: patch"),

    USER_DELETE("user: delete"),

    ENTREPRISE_READ("entreprise: read"),
    ENTREPRISE_UPDATE("entreprise: update"),
    ENTREPRISE_CREATE("entreprise: create"),
    ENTREPRISE_PATCH("entreprise: patch"),

    ENTREPRISE_DELETE("entreprise: delete");

    @Getter
    private final String permission;
}
