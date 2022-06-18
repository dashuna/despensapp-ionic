export class InventoryDTO {
    id: Number;
    name: string;

    constructor(id: Number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class CategoryDTO {
    id: Number;
    name: string;

    constructor(id: Number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class Producto {
    //los campos van a ser los mismos que el dto
    id?: Number;
    name: string;
    description: string;
    category: CategoryDTO;
    photo: Blob;
    inventoryId: Number;
    amount: Number;

    constructor(name: string, description: string, category: CategoryDTO, photo: Blob, inventoryId: Number, amount: Number) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.photo = photo;
        this.inventoryId = inventoryId;
        this.amount = amount;
    }
}

export class UserDTO {
    id?: Number;
    user: string;
    password: string;
    name: string;
    last_name: string;
    email: string;
    telephone: string;
    photo:Blob;

    constructor(user: string, password: string, name: string, last_name: string, email: string, telephone: string, photo:Blob) {
        // this.id = id;
        this.user = user;
        this.password = password;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.telephone = telephone;
        this.photo = photo;
    }
}

export class UserInventoryDTO {
    id?:Number;
    inventory: InventoryDTO;
    accepted: boolean;
    admin: boolean;
    
    constructor(id: Number, inventory: InventoryDTO,  accepted: boolean, admin: boolean) {
        this.id = id;
        this.inventory = inventory;
        this.accepted = accepted;
        this.admin = admin;
    }


}

export class UserNameDTO {
    id?: Number;
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class ShoppingProductDTO {
    id?: Number;
    product: Producto;
    userAdded: UserNameDTO;
    userBuyed: UserNameDTO;
    amount: Number;
    buyed: boolean;
    addedDate: Date;
    buyedDate: Date;

    constructor(product: Producto, userAdded: UserNameDTO, userBuyed: UserNameDTO, amount: Number, buyed: boolean, addedDate: Date, buyedDate: Date) {
        this.product = product;
        this.userAdded = userAdded;
        this.userBuyed = userBuyed;
        this.amount = amount;
        this.buyed = buyed;
        this.addedDate = addedDate;
        this.buyedDate = buyedDate;
    }
}

export class ShoppingInventoryDTO {
    inventoryId: Number;
    name: string;
    products: ShoppingProductDTO[];

    constructor(inventoryId: Number, name: string, products: ShoppingProductDTO[]) {
        this.inventoryId = inventoryId;
        this.name = name;
        this.products = products;
    }
       
}
