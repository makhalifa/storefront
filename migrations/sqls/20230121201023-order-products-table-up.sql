create table order_products(
    id serial primary key,
    order_id int references orders(id),
    product_id int references products(id),
    quantity int not null
);