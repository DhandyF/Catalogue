<template>
  <div class="sidebar">
    <div class="filter-header">
      <div class="filter-title">
        Filter
      </div>
      <button v-show="showClearFilter" class="filter-clear-btn" @click="clearCategory">
        Clear
      </button>
    </div>
    <div class="filter">
      <div id="category-label" class="label" @click="showCategoryFilter">
        Category
        <a id="category-expand-icon" class="expand-icon">&#10094;</a>
      </div>
      <div id="category-item">
        <div class="category" :class="category === 't-shirt' ? 'category-active' : ''" @click="changeCategory('t-shirt')">
          T-shirt
        </div>
        <div class="category" :class="category === 'jacket' ? 'category-active' : ''" @click="changeCategory('jacket')">
          Jacket
        </div>
        <div class="category" :class="category === 'shoes' ? 'category-active' : ''" @click="changeCategory('shoes')">
          Shoes
        </div>
      </div>
    </div>
    <div class="filter">
      <div id="price-label" class="label" @click="showPriceFilter">
        Price
        <a id="price-expand-icon" class="expand-icon">&#10094;</a>
      </div>
      <div id="price-item">
        <input v-model="minPrice" class="price" type="number" placeholder="Minimum price (Rp)" name="minimum-price">
        <input v-model="maxPrice" class="price" type="number" placeholder="Maximum price (Rp)" name="maximum-price">
        <button class="price-button" @click="applyPriceFilter">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: '',
      minPrice: null,
      maxPrice: null
    }
  },
  computed: {
    showClearFilter () {
      if (this.category !== '' || (this.minPrice !== null && this.minPrice !== '') || (this.maxPrice !== null && this.maxPrice !== '')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    showCategoryFilter () {
      const catLabel = document.getElementById('category-label')
      const catItem = document.getElementById('category-item')
      if (catItem.style.display === '') {
        catItem.style.display = 'flex'
        catLabel.className += ' label-active'
      } else {
        catItem.style.display = ''
        catLabel.classList.remove('label-active')
      }
      const icon = document.getElementById('category-expand-icon')
      this.transformExpandIcon(icon)
    },
    showPriceFilter () {
      const priceLabel = document.getElementById('price-label')
      const priceItem = document.getElementById('price-item')
      if (priceItem.style.display === '') {
        priceItem.style.display = 'flex'
        priceLabel.className += ' label-active'
      } else {
        priceItem.style.display = ''
        priceLabel.classList.remove('label-active')
      }
      const icon = document.getElementById('price-expand-icon')
      this.transformExpandIcon(icon)
    },
    transformExpandIcon (element) {
      if (element.classList.contains('icon-active')) {
        element.classList.remove('icon-active')
        element.style.removeProperty('transform')
        element.style.transform = 'rotate(90deg)'
      } else {
        element.className += ' icon-active'
        element.style.removeProperty('transform')
        element.style.transform = 'rotate(270deg)'
      }
    },
    changeCategory (category) {
      this.category = category
      this.$store.dispatch('storeCategory', category)
    },
    applyPriceFilter () {
      if (this.maxPrice === null || this.maxPrice === '') {
        this.$store.dispatch('removeMaxPrice')
      } else {
        this.$store.dispatch('storeMaxPrice', this.maxPrice)
      }
      if (this.minPrice === null || this.minPrice === '') {
        this.$store.dispatch('removeMinPrice')
      } else {
        this.$store.dispatch('storeMinPrice', this.minPrice)
      }
    },
    clearCategory () {
      this.category = ''
      this.minPrice = null
      this.maxPrice = null
      this.$store.dispatch('removeCategory')
      this.$store.dispatch('removeMinPrice')
      this.$store.dispatch('removeMaxPrice')
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: fit-content;
  margin: 90px 0 0 0;
  padding: 0 10px 30px 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
}

.filter-header {
  margin: 0 0 10px 0;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgrey;
}

.filter-title {
  font-family: 'Quicksand-Bold', sans-serif;
  font-size: 17px;
  color: #3A152A;
}

.filter-clear-btn {
  margin: 0;
  padding: 5px 10px;
  font-family: 'Quicksand-SemiBold', sans-serif;
  display: inline-block;
  border-radius: 10px;
  border: none;
  color: #3A152A;
  background-color: white;
  text-decoration: none;
  cursor: pointer;
}

.filter-clear-btn:hover {
  background-color: lightgrey;
}

.filter-clear-btn:focus {
  outline: none;
}

.filter {
  margin: 0;
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgrey;
}

.label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Quicksand-Bold', sans-serif;
  font-size: 15px;
  color: rgba(92, 64, 80, .7);
  cursor: pointer;
}

#category-item {
  width: 100%;
  padding: 5px 0 5px 10px;
  display: none;
  flex-direction: column;
}

.category {
  width: 100%;
  padding: 5px 0;
  font-family: 'Quicksand-Medium', sans-serif;
  font-size: 14px;
  color: rgba(92, 64, 80, .7);
  cursor: pointer;
}

#price-item {
  width: 100%;
  padding: 5px 0 5px 10px;
  display: none;
  flex-direction: column;
}

.price {
  width: 100%;
  margin: 5px 0;
  padding: 5px 10px;
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  border: 1px solid lightgrey;
  border-radius: 10px;
}

.price:focus{
  outline: none;
}

.label:hover, .category:hover {
  color: #5c4050;
}

.expand-icon {
  cursor: pointer;
  width: auto;
  height: 24px;
  padding: 2px 8px;
  color: rgba(0, 0, 0, .5);
  font-weight: bold;
  font-size: 14px;
  transition: 0.6s ease;
  border-radius: 50px;
  -moz-user-select: none;
  -webkit-user-select: none;
  transform: rotate(90deg);
}

.expand-icon:hover {
  background-color: rgba(92, 64, 80, .2);
}

.label-active {
  color: #5c4050 !important;
}

.category-active {
  color: #5c4050;
  font-family: 'Quicksand-SemiBold', sans-serif;
}

.icon-active {
  transform: rotate(180deg);
  background-color: rgba(92, 64, 80, .2);
}

.price-button {
  margin-top: 10px;
  padding: 5px 30px;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #5c4050;
  color: #fff;
  background-color: #7e5d70;
  text-decoration: none;
  cursor: pointer;
}

.price-button:hover {
  background-color: #5c4050;
}

.price-button:focus {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
