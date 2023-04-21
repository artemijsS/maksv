import mongoose, { Schema, Document, model } from 'mongoose';

interface Estate extends Document {
    name: {
        lv: string,
        ru: string,
        en: string,
    },
    description: {
        lv: string,
        ru: string,
        en: string,
    },
    price: number,
    rent: boolean,
    city: mongoose.Schema.Types.ObjectId,
    district: mongoose.Schema.Types.ObjectId,
    street: string,
    location: {
        lat: number,
        lng: number,
    },
    mainImage: string,
    images: string[],
    type: {
        lv: string,
        ru: string,
        en: string,
    },

    rooms?: number,
    livingArea?: number,
    floor?: number,
    series?: {
        lv: string,
        ru: string,
        en: string,
    },
    condition?: {
        lv: string,
        ru: string,
        en: string,
    },
    landArea?: number,
    cadastralNumber?: string
}

const estateSchema: Schema = new Schema<Estate>({
    name: {
        lv: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    },
    description: {
        lv: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    },
    price: {
        type: Number,
        required: true,
    },
    rent: {
        type: Boolean,
        required: true,
        default: false,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    mainImage: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    type: {
        lv: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    },

    rooms: {
        type: Number,
    },
    livingArea: {
        type: Number,
    },
    floor: {
        type: Number,
    },
    series: {
        lv: {
            type: String,
        },
        ru: {
            type: String,
        },
        en: {
            type: String,
        },
    },
    condition: {
        lv: {
            type: String,
        },
        ru: {
            type: String,
        },
        en: {
            type: String,
        },
    },
    landArea: {
        type: Number,
    },
    cadastralNumber: {
        type: String
    }
},{ timestamps: true });

export default mongoose.models.Estate || model<Estate>('Estate', estateSchema);
