import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Box, Typography, Button, TextField } from '@mui/material'
import { getCategories, createCategory } from '../../services/CategoryService'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

export default function ViewCategory() {
    const [categories, setcategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const getTables = async () => {
        try {
            setLoading(true);
            const response = await getCategories();
            const categoriesData = response.data?.categories || [];
            setcategories(categoriesData);
        } catch (error) {
            console.error("Kategoriyalarni yuklashda xatolik:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!name.trim()) return;
        try {
            setLoading(true);
            await createCategory({ name, description: description || "false" });
            setName('');
            setDescription('');
            await getTables();
        } catch (error) {
            console.error("Kategoriya qo'shishda xatolik:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTables();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="mt-40">

                <Box sx={{ mb: 4, p: 2, borderRadius: 1, maxWidth: 500 }}>
    <Typography variant="h7" sx={{ mb: 2 }}>Yangi kategoriya qo'shish</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'rows', gap: 3 }}>
        <TextField
            label="Kategoriya nomi"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            label="Tavsif (Description)"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
            +
        </Button>
    </Box>
</Box>


                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5">Kategoriyalar</Typography>
                        
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' }, height: 80, borderRadius: 1 }} />
                            <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' }, height: 80, borderRadius: 1 }} />
                            <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' }, height: 80, borderRadius: 1 }} />
                            <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' }, height: 80, borderRadius: 1 }} />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {categories.map((category) => (
                                <Box 
                                    key={category._id} 
                                    sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}
                                >
                                    <Link
                                        to={`/categories/read-items/${category._id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, height: '100%', '&:hover': { bgcolor: '#f9f9f9', cursor: 'pointer' } }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {category.name}
                                            </Typography>
                                            {category.description && category.description !== "false" && (
                                                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                                    {category.description}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </div>

           
            <Footer/>
        </>
    )
}
