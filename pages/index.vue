<template>
  <div class="catalog-container">
    <!-- Search Bar -->
    <div class="search-bar">
      <input v-model="search" type="text" placeholder="Search product" name="search">
      <a id="search-clear-icon" @click="clearSearch">&#10006;</a>
    </div>
    <!-- Product -->
    <div class="product">
      <div v-for="product in productsFilter" :key="product.id" class="product-card" @click="productDetail(product.id)">
        <img :src="require(`~/assets/images/${product.primaryImage}`)" alt="product image" class="product-image">
        <div class="product-attr">
          <div class="product-name">
            {{ product.name }}
          </div>
          <div class="product-price">
            Rp. {{ Number(product.price).toLocaleString('id') }}
          </div>
        </div>
      </div>
    </div>
    <!-- Not Found -->
    <div v-if="productsFilter.length === 0" class="not-found">
      Oops, product not found...
    </div>
  </div>
</template>

<script>
export default {
  layout: 'catalog',
  data () {
    return {
      search: '',
      products: [],
      productsFilter: []
    }
  },
  watch: {
    search () {
      this.filterProduct()
      this.showClearIcon()
    },
    '$store.state.category' () {
      this.filterProduct()
    },
    '$store.state.minPrice' () {
      this.filterProduct()
    },
    '$store.state.maxPrice' () {
      this.filterProduct()
    }
  },
  mounted () {
    this.loadProducts()
  },
  methods: {
    async loadProducts () {
      this.products = await this.$axios.$get('/product')
      this.productInit()
    },
    productInit () {
      this.productsFilter = this.products
    },
    showClearIcon () {
      const clearIcon = document.getElementById('search-clear-icon')
      if (this.search === '') {
        clearIcon.style.display = ''
      } else {
        clearIcon.style.display = 'flex'
      }
    },
    clearSearch () {
      this.search = ''
    },
    filterProduct () {
      const category = this.$store.state.category
      const minPrice = this.$store.state.minPrice
      const maxPrice = this.$store.state.maxPrice
      if (this.$store.state.maxPrice !== 0) {
        this.productsFilter = this.products.filter(prod =>
          prod.name.toLowerCase().includes(this.search.toLowerCase()) &&
          prod.category.toLowerCase().includes(category.toLowerCase()) &&
          prod.price >= minPrice &&
          prod.price <= maxPrice
        )
      } else {
        this.productsFilter = this.products.filter(prod =>
          prod.name.toLowerCase().includes(this.search.toLowerCase()) &&
          prod.category.toLowerCase().includes(category.toLowerCase()) &&
          prod.price >= minPrice
        )
      }
    },
    productDetail (productId) {
      this.$router.push('/product/' + productId)
    }
  }
}
</script>

<style>
.catalog-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 0 30px 0;
}

.search-bar input {
  width: 100%;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 15px;
  font-family: 'Quicksand', sans-serif;
  border: 1px solid lightgrey;
  border-radius: 20px;
}

.search-bar input:focus{
  outline: none;
}

.search-bar i {
  font-size: 15px;
  background-image: url('~assets/icons/search.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  background-size: 20px 20px;
}

#search-clear-icon {
  display: none;
  cursor: pointer;
  width: auto;
  padding: 3px 6px;
  color: rgba(0, 0, 0, .5);
  font-weight: bold;
  font-size: 14px;
  transition: 0.6s ease;
  border-radius: 50px;
  -moz-user-select: none;
  -webkit-user-select: none;
  background-color: rgba(92, 64, 80, .1);
}

#search-clear-icon:hover {
  background-color: rgba(92, 64, 80, .3);
}

.product {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.product-card {
  width: 180px;
  height: 300px;
  margin: 6px;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
}

.product-card .product-image {
  width: 100%;
  height: 170px;
  margin: 0;
  padding: 0;
  border-radius: 10px 10px 0 0;
}

.product-card .product-attr {
  margin: 0;
  padding: 10px;
}

.product-attr .product-name {
  margin: 0 0 10px 0;
  font-family: 'Quicksand-SemiBold', sans-serif;
  color: darkslategrey;
  font-size: 17px;
}

.product-attr .product-price {
  font-family: 'Quicksand-Bold', sans-serif;
  color: #FA591D;
  font-size: 18px;
}

.not-found {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Quicksand-Bold', sans-serif;
  font-size: 20px;
  color: #5c4050;
}
</style>
