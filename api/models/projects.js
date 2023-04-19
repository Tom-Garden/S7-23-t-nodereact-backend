import mongoose from "mongoose";

const userSchema = mongoose.mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: [5, 'Must be at least 5 characters long, {VALUE} is not long enough'],
        maxLength: [50, 'Must be at most 50 characters long, {VALUE} is not supported']
    },
    subtitle: {
        type: String,
        require: true,
        minLength: [10, 'Must be at least 10 characters long, {VALUE} is not long enough'],
        maxLength: [60, 'Must be at most 35 characters long, {VALUE} is not supported']
    },
    img: {
        type: String
    },
    description: {
        type: String,
        require: true,
        minLength: [20, 'Must be at least 20 characters long, {VALUE} is not long enough'],
        
    },
    autor: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.String,
        ref: 'Categories'
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    parcialAmount: {
        type: Number,
        default: 0
    },
   
    devRequired: {
        type:[{
            quantity: Number,
            position: String
        }],
        default: []
    },
    techRequired:{
        type: [String],
        default: []
    },
    colaborators:{
        type:[{
            quantity: Number,
            position: String
        }],
        default: []
    },//ux
    status: {
        type: String,
        enum: ['active', 'paused', 'finished', 'deleted' ],
        default: 'active'
    },
    finaldate:{
        type: Date,
    },
},

{
    timestamps: true,
  }
);

const Project = mongoose.model("Project", userSchema)
export default Project