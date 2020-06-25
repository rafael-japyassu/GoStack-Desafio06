import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();

    let income = 0;
    let outcome = 0;

    transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += parseFloat(transaction.value.toString());
      } else {
        outcome += parseFloat(transaction.value.toString());
      }
    });

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
