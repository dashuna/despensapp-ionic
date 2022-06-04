export class InventoryDTO {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class CategoryDTO {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class Producto {
    //los campos van a ser los mismos que el dto
    id?: number;
    name: string;
    description: string;
    category: CategoryDTO;
    photo: Blob;
    amount: number

    constructor(name: string, description: string, category: CategoryDTO, photo: Blob, amount: number) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.photo = photo;
        this.amount = amount;
    }
}