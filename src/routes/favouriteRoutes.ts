import { Router } from 'express';
import { addToFavourites } from '../controllers/favouriteController';

const router = Router();

router.post('/favourites', addToFavourites);


export default router;