// Domain Model - User
export class User {
    constructor({ id, nombre, email, rol, avatar, horasTrabajadas, tareasCompletadas, rendimiento, estado }) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.avatar = avatar;
        this.horasTrabajadas = horasTrabajadas;
        this.tareasCompletadas = tareasCompletadas;
        this.rendimiento = rendimiento;
        this.estado = estado;
    }

    isActive() {
        return this.estado === 'Activo';
    }

    isInactive() {
        return this.estado === 'Inactivo';
    }
}

export class Role {
    constructor({ id, nombre, descripcion, permisos, usuariosCount, icon, color }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.permisos = permisos;
        this.usuariosCount = usuariosCount;
        this.icon = icon;
        this.color = color;
    }
}

export class UsersStats {
    constructor({ totalUsuarios, rolesActivos, sesionesHoy, rendimiento }) {
        this.totalUsuarios = totalUsuarios;
        this.rolesActivos = rolesActivos;
        this.sesionesHoy = sesionesHoy;
        this.rendimiento = rendimiento;
    }
}
