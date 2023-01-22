create table orders(
    id serial primary key,
    user_id int references users(id),
    product_id int references products(id),
    status varchar(255) not null
);