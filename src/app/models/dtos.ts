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