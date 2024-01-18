// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

var app = angular.module('myapp', ['ngRoute'])
  .controller('myctrl', function
    ($scope, $http) {
    $scope.keyword = '';
    $scope.timkiem = function (input) {
      $scope.keyword = input;
    };
    $scope.countPro = 0;
    $scope.demso = function () {
      $scope.countPro = $scope.countPro + 1;
    };
    $scope.listDanhMuc = [];
    $http.get('json/danhsachdanhmuc.json').then(
      function (res) {
        $scope.listDanhMuc = res.data;
      },
      function (res) {

      }
    );
    $scope.listDangXuLy = [];
    $http.get('json/dangxuly.json').then(
      function (res) {
        $scope.listDangXuLy = res.data;
      },
      function (res) {

      }
    );
    $scope.iconFooter = [
      {
        icons: 'ios.svg'
      },
      {
        icons: 'android.svg'
      },
      {
        icons: 'huawei_app_install.png'
      }
    ];
    $scope.textHelp = [
      'Trung tâm trợ giúp',
      'An toàn mua bán',
      'Liên hệ hỗ trợ'
    ];
    $scope.textAbout = [
      'Giới thiệu',
      'Quy chế hoạt động sàn',
      'Chính sách bảo mật',
      'Giải quyết tranh chấp',
      'Tuyển dụng',
      'Truyền thông',
      'Blog'
    ];
    $scope.listCarousel = [];
    $http.get('json/danhsachslide.json').then(
      function (res) {
        $scope.listCarousel = res.data;
      },
      function (res) {

      }
    );
    $scope.listSpec = [];
    $http.get('json/danhsachdacbiet.json').then(
      function (res) {
        $scope.listSpec = res.data;
      },
      function (res) {

      }
    );
    $scope.listTitle1 = [];
    $http.get('json/danhsachtieude1.json').then(
      function (res) {
        $scope.listTitle1 = res.data;
      },
      function (res) {

      }
    );
    $scope.listTitle2 = [];
    $http.get('json/danhsachtieude2.json').then(
      function (res) {
        $scope.listTitle2 = res.data;
      },
      function (res) {

      }
    );
    $scope.listProMain = [];
    $http.get('json/sanphamtrangchu.json').then(
      function (res) {
        $scope.listProMain = res.data;
        $scope.page = 1;
        $scope.limit = 12;
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.totalPage = Math.ceil($scope.listProMain.length / $scope.limit);
        $scope.numberOfPage = Array.from(Array($scope.totalPage).keys());
      },
      function (res) {

      }
    );
    $scope.showPage = function (p) {
      $scope.page = p;
      $scope.start = ($scope.page - 1) * $scope.limit;
    };
    $scope.cot = '';
    $scope.kieu = '';
    $scope.order = function (cot, kieu) {
      $scope.cot = cot;
      $scope.kieu = kieu;
    };
    $scope.kieusapxep = 'macdinh';
    $scope.danhsachxe = [];
    $http.get('json/danhsachxe.json').then(
      function (res) {
        $scope.danhsachxe = res.data;
      },
      function (res) {

      }
    );
    $scope.danhsachhangxe = [];
    $http.get('json/danhsachhangxe.json').then(
      function (res) {
        $scope.danhsachhangxe = res.data;
      },
      function (res) {

      }
    );
    $scope.danhmucxeco = [];
    $http.get('json/danhmucxeco.json').then(
      function (res) {
        $scope.danhmucxeco = res.data;
      },
      function (res) {

      }
    );
    $scope.congcu = [];
    $http.get('json/congcuban.json').then(
      function (res) {
        $scope.congcu = res.data;
      },
      function (res) {

      }
    );
    $scope.giohang = [];
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/body', {
        templateUrl: 'component/body.html',
        controller: 'bodyCtrl',
        controllerAs: 'body'
      })
      .when('/cart', {
        templateUrl: 'donmua.html',
        controller: 'cartCtrl',
        controllerAs: 'cart'
      })
      .when('/sanphamchitiet/:id', {
        templateUrl: 'chitiet.html',
        controller: 'chitietCtrl'
      })
      .otherwise({
        templateUrl: 'component/body.html',
        controller: 'bodyCtrl',
        controllerAs: 'body'
      })
  })
  .controller('bodyCtrl', function ($scope) {
    $scope.mua = function (sp) {
      var chuaCo = true;
      for (const item of $scope.$parent.giohang) {
        if (item.id == sp.id) {
          item.soluong++;
          chuaCo = false;
          break;
        }
      }
      if (chuaCo) {
        sp.soluong = 1;
        $scope.$parent.giohang.push(sp);
      }
    }
  })
  .controller('cartCtrl', function ($scope) {
    $scope.xoaHet = function () {
      $scope.$parent.giohang.splice(0, $scope.$parent.giohang.length);
      $scope.$parent.countPro = 0;
    }
    $scope.xoa = function (i) {
      $scope.$parent.giohang.splice(i, 1);
      $scope.$parent.countPro -= 1;
    }
    $scope.tinhTong = function () {
      var tong = 0;
      for (const item of $scope.$parent.giohang) {
        tong += item.price * item.soluong;
      }
      return tong;
    }
  })
  .controller('chitietCtrl', function ($scope, $routeParams) {
    var id = $routeParams.id;
    $scope.sanpham = {};
    for (const item of $scope.$parent.listProMain) {
      if (item.id == id) {
        $scope.sanpham = item;
        break;
      }
    }
  })
