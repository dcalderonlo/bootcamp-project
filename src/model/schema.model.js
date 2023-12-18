import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
    first_name: { 
      type: String, required: true 
    },
    last_name: { 
      type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    address: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      country_code: { type: String, required: true }
    },
    card: {
      card_number: { type: String, required: true },
      card_type: { type: String, required: true },
      currency_code: { type: String, required: true },
      balance: { type: String, required: true }
    },
    married_status: { type: Boolean, required: true }
  }
);