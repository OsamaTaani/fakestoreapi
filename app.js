function Products(title , price , description , image ){
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;

}



fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>console.log(json))
