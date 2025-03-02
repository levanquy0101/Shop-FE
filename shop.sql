INSERT INTO shop.sizes (id, name, size_type)
VALUES
    -- Quần áo (Clothing)
    (1, 'XS', 'Clothing'),
    (2, 'S', 'Clothing'),
    (3, 'M', 'Clothing'),
    (4, 'L', 'Clothing'),
    (5, 'XL', 'Clothing'),
    (6, 'XXL', 'Clothing'),

    -- Giày (Shoes)
    (7, 'US 7', 'Shoes'),
    (8, 'US 8', 'Shoes'),
    (9, 'US 9', 'Shoes'),
    (10, 'UK 6', 'Shoes'),
    (11, 'UK 7', 'Shoes'),
    (12, 'UK 8', 'Shoes'),
    (13, 'EU 39', 'Shoes'),
    (14, 'EU 40', 'Shoes'),
    (15, 'EU 41', 'Shoes');

INSERT INTO shop.colors (id, hex_code, name) VALUES
(1, '#FF5733', 'Đỏ Cam'),
(2, '#33FF57', 'Xanh Lục Chanh'),
(3, '#3357FF', 'Xanh Dương Hoàng Gia'),
(4, '#F1C40F', 'Vàng Hướng Dương'),
(5, '#8E44AD', 'Tím'),
(6, '#E74C3C', 'Đỏ Cinnabar'),
(7, '#3498DB', 'Xanh Trời'),
(8, '#2ECC71', 'Xanh Ngọc Bích'),
(9, '#F39C12', 'Cam'),
(10, '#1ABC9C', 'Xanh Lam Mạ');
