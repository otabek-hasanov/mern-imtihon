import { useParams, Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { getItems as fetchItems, createItem } from '../../services/ItemsService' 
import { useState, useEffect } from 'react'
import { Skeleton, Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function ViewItems() {
    const { id } = useParams();
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [available, setAvailable] = useState(true)

    const loadItems = async () => {
        try {
            setLoading(true);
            const response = await fetchItems(id)
            const itemsList = response.data?.items || [];
            setItems(itemsList)
        } catch (error) {
            console.error("Itemslarni yuklashda xatolik:", error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCreateItem = async () => {
        if (!name.trim() || !price.trim()) return;
        try {
            setLoading(true);
            await createItem({
                name,
                description: description || "false",
                price: Number(price),
                available,
                image,
                category: id
            });
            setName("");
            setDescription("");
            setPrice("");
            setAvailable(true);
            await loadItems();
        } catch (error) {
            console.error("Item qo'shishda xatolik:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, [id]);

    return (
        <>
            <Navbar/>
            <div className="mt-40" style={{ padding: '20px' }}>

                <Box sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 1, maxWidth: 1200 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Yangi mahsulot qo'shish</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField
                            label="Item nomi"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Tavsif (Description)"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Narxi ($)"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Rasm URL"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Holati</InputLabel>
                            <Select
                                value={available}
                                label="Holati"
                                onChange={(e) => setAvailable(e.target.value)}
                            >
                                <MenuItem value={true}>Sotuvda bor</MenuItem>
                                <MenuItem value={false}>Sotuvda yo'q</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" fullWidth onClick={handleCreateItem}>
                            + Qo'shish
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Link to="/categories" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" size="small">&lt; Orqaga</Button>
                    </Link>
                    <Typography variant="h5">Maxsulotlar ro'yxati</Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' }, display: 'flex', gap: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                            <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 1 }} />
                            <Box sx={{ flex: 1 }}>
                                <Skeleton variant="text" width="60%" height={25} />
                                <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
                                <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
                            </Box>
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' }, display: 'flex', gap: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                            <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: 1 }} />
                            <Box sx={{ flex: 1 }}>
                                <Skeleton variant="text" width="60%" height={25} />
                                <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
                                <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {items.map((item) => (
                            <Box 
                                key={item._id} 
                                sx={{ 
                                    width: { xs: '100%', sm: 'calc(50% - 8px)' }, 
                                    border: '1px solid #e0e0e0', 
                                    borderRadius: 1, 
                                    p: 2,
                                    display: 'flex',
                                    gap: 2,
                                    opacity: item.available ? 1 : 0.6
                                }}
                            >
                                {item.image && item.image !== "false" && (
                                    <Box sx={{ width: 100, height: 100, flexShrink: 0 }}>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} 
                                        />
                                    </Box>
                                )}
                                
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                    {item.description && item.description !== "false" && (
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                            {item.description}
                                        </Typography>
                                    )}
                                    <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 'medium' }}>
                                        Narxi: {item.price} dollar
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            display: 'block', 
                                            mt: 0.5, 
                                            color: item.available ? 'green' : 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {item.available ? "Sotuvda bor" : "Sotuvda yo'q"}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </div>
            <Footer/>
        </>
    )
}
