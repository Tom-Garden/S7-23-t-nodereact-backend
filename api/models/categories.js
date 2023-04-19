import mongoose from "mongoose";

const categorySchema = mongoose.mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      minLength: [5,"Must be at least 5 characters long, {VALUE} is not long enough"],
      maxLength: [50,"Must be at most 50 characters long, {VALUE} is not supported"],
    },
    description: {
      type: String,
      require: false,
      minLength: [10,"Must be at least 20 characters long, {VALUE} is not long enough"],
      maxLength: [300,"Must be at most 300 characters long, {VALUE} is not supported"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
