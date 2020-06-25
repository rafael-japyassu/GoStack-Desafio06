import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

const gategoriesRouter = Router();

gategoriesRouter.get('/', async (request, response) => {
  // TODO
  const categories = await getRepository(Category).find();
  return response.json(categories);
});

export default gategoriesRouter;
