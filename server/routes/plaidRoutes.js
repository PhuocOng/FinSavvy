import express from "express";
import {
  exchangeToken,
  getTransactions,
} from "../controllers/plaidController.js";

const router = express.Router();

router.post("/exchange_token", exchangeToken);
router.get("/transactions", getTransactions);

export default router;
