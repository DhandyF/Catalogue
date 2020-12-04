<template>
  <div class="product-container">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <ul>
        <li>
          <a href="/">Catalogue</a>
        </li>
        <li>
          {{ product.name }}
        </li>
      </ul>
    </div>
    <!-- Detail Product -->
    <div class="product-content">
      <!-- Product Image -->
      <div class="product-image">
        <!-- Carousel -->
        <div class="carousel">
          <div class="carousel-item fade">
            <img class="item-image" :src="require(`~/assets/images/${product.primaryImage}`)" alt="product image">
          </div>
          <div
            v-for="image in product.images"
            :key="'c-'+image"
            class="carousel-item fade"
          >
            <img class="item-image" :src="require(`~/assets/images/${image}`)" alt="product image">
          </div>
          <div
            v-for="color in product.color"
            :key="'c-'+color.name"
            class="carousel-item fade"
          >
            <img class="item-image" :src="require(`~/assets/images/${color.image}`)" alt="product image">
          </div>
          <a class="prev-item" @click="plusSlide(-1)">&#10094;</a>
          <a class="next-item" @click="plusSlide(1)">&#10095;</a>
        </div>
        <!-- Small Image -->
        <div id="image-group">
          <img class="image" :class="slideIndex === 1 ? 'image-focus' : ''" :src="require(`~/assets/images/${product.primaryImage}`)" alt="product image" @click="showImage(1)">
          <img
            v-for="(image, index) in product.images"
            :key="image"
            class="image"
            :class="slideIndex === index+2 ? 'image-focus' : ''"
            :src="require(`~/assets/images/${image}`)"
            alt="product image"
            @click="showImage(index + 2)"
          >
          <img
            v-for="(color, index) in product.color"
            :key="color.name"
            class="image"
            :class="slideIndex === product.images.length + index + 2 ? 'image-focus' : ''"
            :src="require(`~/assets/images/${color.image}`)"
            alt="product image"
            @click="showImage(product.images.length + index + 2)"
          >
          <a class="prev-image" @click="scrollLeft">&#10094;</a>
          <a class="next-image" @click="scrollRight">&#10095;</a>
        </div>
      </div>
      <!-- Product Detail -->
      <div class="product-detail">
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-price">
          <div class="label">
            Price
          </div>
          <div class="price">
            Rp. {{ Number(product.price).toLocaleString('id') }}
          </div>
        </div>
        <div class="product-color">
          <div class="label">
            Color
          </div>
          <div class="color">
            <button
              v-for="(color, index) in product.color"
              :key="'v-'+color.name"
              class="product-color-btn"
              @click="showImage(product.images.length + index + 2)"
            >
              {{ color.name }}
            </button>
          </div>
        </div>
        <div class="product-desc">
          <div class="label">
            Description
          </div>
          <div class="desc">
            {{ product.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'product',
  async asyncData (context) {
    const id = context.params.id
    try {
      const product = await context.app.$axios.$get(
        `https://my-json-server.typicode.com/DhandyF/Catalogue/product/${id}`
      )
      return { product }
    } catch (e) {
      context.error(e) // Show the nuxt error page with the thrown error
    }
  },
  data () {
    return {
      slideIndex: 1
    }
  },
  mounted () {
    this.showSlide(this.slideIndex)
  },
  methods: {
    showSlide (n) {
      const slides = document.getElementsByClassName('carousel-item')
      if (n > slides.length) {
        this.slideIndex = 1
      }
      if (n < 1) {
        this.slideIndex = slides.length
      }
      for (let index = 0; index < slides.length; index++) {
        slides[index].style.display = 'none'
      }
      slides[this.slideIndex - 1].style.display = 'flex'
    },
    showImage (slideIndex) {
      this.showSlide(this.slideIndex = slideIndex)
    },
    plusSlide (slideIndex) {
      this.showSlide(this.slideIndex += slideIndex)
    },
    currentSlide (slideIndex) {
      this.slideIndex = slideIndex
      this.showSlide(slideIndex)
    },
    scrollRight () {
      const imgElement = document.getElementById('image-group')
      let scrollAmount = 0
      const slideTimer = setInterval(function () {
        imgElement.scrollLeft += 20
        scrollAmount += 10
        if (scrollAmount >= 100) {
          window.clearInterval(slideTimer)
        }
      }, 25)
    },
    scrollLeft () {
      const imgElement = document.getElementById('image-group')
      let scrollAmount = 0
      const slideTimer = setInterval(function () {
        imgElement.scrollLeft -= 20
        scrollAmount += 10
        if (scrollAmount >= 100) {
          window.clearInterval(slideTimer)
        }
      }, 25)
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.product-container {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.product-content {
  display: flex;
  width: 100%;
  margin: 0;
}

.breadcrumb {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
}

.breadcrumb ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb li {
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  float: left;
  font-family: 'Quicksand-SemiBold', sans-serif;
  font-size: 13px;
  line-height: 20px;
  color:#5c4050;
}

.breadcrumb li a {
  display: block;
  padding-right: 10px;
  color: #FA591D;
  font-family: 'Quicksand-Medium', sans-serif;
  text-decoration: none;
  height: 20px;
  position: relative;
}

.breadcrumb li a:hover {
  font-weight: 700;
  color: #5c4050;
}

.breadcrumb li a::after {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  color: #5c4050;
  content: "\276F";
}

.product-content .product-image {
  width: 40%;
  min-width: 467px;
}

.product-content .product-detail {
  width: 60%;
  padding: 0 0 0 50px;
  display: flex;
  flex-direction: column;
}

.product-name {
  width: 100%;
  padding: 24px 0;
  font-family: 'Quicksand-Bold', sans-serif;
  font-size: 20px;
  color: #5c4050;
  border-bottom: 1px solid lightgrey;
}

.product-price, .product-color, .product-desc {
  width: 100%;
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid lightgrey;
}

.color {
  display: flex;
}

.product-color-btn {
  margin-right: 10px;
  padding: 10px 15px;
  font-family: 'Quicksand-SemiBold', sans-serif;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid lightgrey;
  color: rgba(92, 64, 80, .7);
  background-color: white;
  text-decoration: none;
  cursor: pointer;
}

.product-color-btn:hover {
  color: #5c4050;
  font-family: 'Quicksand-Bold', sans-serif;
  border: 1px solid #5c4050;
}

.product-color-btn:focus {
  outline: none;
  font-family: 'Quicksand-Bold', sans-serif;
  border: 1px solid #5c4050;
  color: #5c4050;
}

.label {
  width: 120px;
  min-width: 120px;
  font-family: 'Quicksand-SemiBold', sans-serif;
  font-size: 15px;
  color: rgba(92, 64, 80, .5);
}

.price {
  font-family: 'Quicksand-Bold', sans-serif;
  color: #FA591D;
  font-size: 28px;
}

.desc {
  font-family: 'Quicksand-SemiBold', sans-serif;
  font-size: 15px;
  color: #5c4050;
}

.carousel {
  max-width: 1000px;
  height: 400px;
  position: relative;
  margin: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
}

.carousel-item {
  display: none;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: inherit;
}

.item-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

#image-group {
  display: flex;
  align-items: center;
  overflow: scroll;
  transform: 500ms ease 0s;
  position: relative;
  width: 100%;
  height: 140px;
  padding: 20px;
  margin: 0;
}

::-webkit-scrollbar{
  display: none;
}

.image {
  width: 80px;
  height: 80px;
  margin: 0 5px;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
}

.image:hover {
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  border: 1px solid #5c4050;
}

.image-focus {
  border: 1px solid #5c4050;
}

.prev-item, .next-item {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 10px 18px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 50px;
  -moz-user-select: none;
  -webkit-user-select: none;
  background-color: rgba(0, 0, 0, 0.2);
}

.prev-item:hover, .next-item:hover {
  background-color: rgba(92, 64, 80, 1);
}

.next-item {
  right: 0;
  border-radius: 50px;
}

.prev-image, .next-image {
  cursor: pointer;
  position: sticky;
  width: auto;
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 50px;
  -moz-user-select: none;
  -webkit-user-select: none;
  background-color: rgba(92, 64, 80, .5);
}

.prev-image:hover, .next-image:hover {
  background-color: rgba(92, 64, 80, 1);
}

.prev-image {
  right: 400px;
}

.next-image {
  right: 0;
}

.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@media screen and (max-width: 980px) {
  .product-content {
    flex-direction: column;
  }

  .product-content .product-image {
    margin: 0 auto;
    width: 467px;
  }

  .product-content .product-detail {
    margin: 0 auto 50px auto;
    width: 70%;
    min-width: 467px;
    padding: 0;
  }
}
</style>
