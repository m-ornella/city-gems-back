import { Router } from 'express';
import { addToFavourites, getFavourites } from '../controllers/favouriteController';

const router = Router();

router.post('/favourites', addToFavourites);
router.get('/favourites', getFavourites);


export default router;