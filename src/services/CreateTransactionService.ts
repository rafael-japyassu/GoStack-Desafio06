import { getCustomRepository, getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new AppError(
        'The withdrawal is greater than your available balance',
      );
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
    });

    const categoryRepository = getRepository(Category);

    const categoryDatabase = await categoryRepository.findOne({
      where: { title: category },
    });

    if (categoryDatabase) {
      transaction.category_id = categoryDatabase.id;
    } else {
      const newCategory = await categoryRepository.save({ title: category });
      transaction.category_id = newCategory.id;
    }

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
