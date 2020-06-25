import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.findOne(id);
    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
