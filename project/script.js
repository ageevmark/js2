const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return fetch(url).then((res) => res.json())
}

class GoodsItem {
  constructor({ product_name = '', price = 0 }) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
    </div>
  `;
  }
}
class GoodsList {
  items = [];
  filteredItems = [];

  // получение товаров
  fetchGoods() {
    return service(GET_GOODS_ITEMS).then((data) => {
      this.items = data;
      this.filteredItems = data;
    })
  }

  // поиск товара
  filterItems(value) {
    this.filteredItems = this.items.filter(({ product_name }) => {
      return product_name.match(new RegExp(value, 'gui'))
    })
  }

  // считаем суммарную стоимость всех элементов goods
  getSum() {
    return this.items.reduce((prev, { price }) => {
      returnprev + price;
    }, 0)
  }

  // открисовка товаров
  render() {
    const goods = this.filteredItems.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goods;
  }
}

class BasketGoodsList {
  items = [];
  fetchGoods() {
    service(GET_BASKET_GOODS_ITEMS, (data) => {
      this.items = data.contents;
    });
  }
}

// const goodsList = new GoodsList();
// goodsList.fetchGoods().then(() => {
//   goodsList.render();
// });

// const basketGoodsList = new BasketGoodsList();
// basketGoodsList.fetchGoods();

// document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
//   const value = document.getElementsByClassName('goods-search')[0].value;
//   goodsList.filterItems(value);
//   goodsList.render();
// })


window.onload = () => {
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      filteredItems: [],
      searchValue: ''
    },
    mounted() {
      service(GET_GOODS_ITEMS).then((data) => {
        this.items = data;
        return data;
      })
    },
    computed: {
      getSum() {
        return this.items.reduce((prev, { price }) => {
          returnprev + price;
        }, 0)
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(value, 'gui'))
        })
      }
    }
  })
}
