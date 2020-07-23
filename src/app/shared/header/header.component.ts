import { Component, OnInit, Input } from '@angular/core';
import { AuthService, UserInfo, } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';//---i18n
import { ComService } from 'src/app/core/com.service';
import { ShopService, ProductBrandsInfo } from './../../core/services/shop.service';
import { OrderService } from './../../core/services/order.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languageBtn;//---i18n
  language;//---i18n

  bandlists;
  banddata;
  bandlistId;
  productlist;
  cartNum;
  cartNumlen;
  isLoggedIn = false;
  userInfo: UserInfo;
  productBrandsInfo: ProductBrandsInfo;

  public show: boolean = false;
  public buttonName: any = 'Show';

  public show0: boolean = false;
  public buttonName0: any = 'Show';

  constructor(
    public com: ComService,
    private authServise: AuthService,
    private router: Router,
    public translateService: TranslateService,
    private shopSer: ShopService,
    private orderSer: OrderService,
  ) { }

  ngOnInit(): void {

    this.userInfo = this.authServise.GetUserInfo();
    console.log(this.userInfo);

    // this.productBrandsInfo = this.shopSer.GetLastProductBrandsInfo();
    // console.log( this.productBrandsInfo)

    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en/) ? browserLang : 'en');



    this.com.httpGet('/api/product/all-product-brands').subscribe((res) => {
      console.log(res);
      this.bandlists = res;
      this.banddata = this.bandlists.data;
      console.log(this.banddata)
      // this.bandlistId = this.banddata.id;
    })

    const goodInfoText = window.localStorage.getItem('cart_lists');
    console.log(goodInfoText + "购物车数据");
    this.productlist = goodInfoText;
    console.log(this.productlist);
    console.log(JSON.parse(this.productlist));
    this.cartNum = JSON.parse(this.productlist);
    console.log(this.cartNum.length + "购物车数据");
    // this.cartNumlen = this.cartNum.length;

  }


  toggle() {
    this.show = !this.show;
    //更换按钮的名称
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  togglesearch() {
    this.show0 = !this.show0;
    //更换按钮的名称
    if (this.show0)
      this.buttonName0 = "Hide";
    else
      this.buttonName0 = "Show";
  }

  toggleBox() {

    this.show = this.show;
    // 更换按钮的名称
    if (this.show = !this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Hide";
  }

  onblankhide() {

  }

  logout(): void {
    // this.isLoggedIn = false;
    this.authServise.logout().subscribe(
      () => {
        this.router.navigate(['/auth/login']);
      }
    )
  }

  search() {
    this.router.navigate(['/goods/search']);
  }

  getList(brandId) {
    this.com.httpGet('/api/product/all-products', { brandId }).subscribe((res) => {
      console.log(res);

    })
  }

  openAccount() {
    this.orderSer.GetLastMyAddrInfo().subscribe(
      (info) => {
        this.router.navigate(['/user/account']);
      },
      (err: Error) => {
        this.router.navigate(['/auth/login']);
        // alert(err.message);
      }
    )
  }

  openCart() {
    this.orderSer.GetLastMyAddrInfo().subscribe(
      (info) => {
        this.router.navigate(['/user/cart']);
      },
      (err: Error) => {
        this.router.navigate(['/auth/login']);
        // alert(err.message);
      }
    )
  }

  //获取品牌
  openBand() {
    console.log(this.bandlists + "点击");
  }



}
