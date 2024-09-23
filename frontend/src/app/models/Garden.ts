export type Garden = {
    _id:string;
    ownerId: string; // Reference to the user's ObjectId
    name: string;
    area: {
        total: number;
        pool: number;
        greenery: number;
        tables: number;
        chairs: number;
        fountain: number;
    };
    layout: Array<{
        shapeType: 'square' | 'rectangle' | 'circle';
        color: string;
        dimension: {
        width?: number;
        height?: number;
        radius?: number;
        };
        position: {
        x: number;
        y: number;
        };
    }>;
    createdAt: Date;
    type: 'private' | 'restaurant';
    services: string[];
}