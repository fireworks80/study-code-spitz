// const _recursive = (arr, idx, acc) => {
//   return idx > -1 ? _recursive(arr, idx - 1, acc + arr[idx]) : acc;
// };

// const recursive = (arr) => _recursive(arr, arr.length - 1, 0);
// console.log(recursive(arr));

const sumOfFor = (arr) => {
  let acc = 0;

  for (let i = arr.length - 1; i > -1; i = i - 1) {
    acc = acc + arr[i];
  } // for
  return acc;
};

// console.log(sumOfFor([1, 2, 3, 4, 5]));
/*
0. 변수랑 스코프와 라이프사이클을 갖는다. 메모리와 연산은 상호 교환할 수 있으며 특히 라이프사이클에 관여함.
1. 오류와 실패의 관계 - 오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있다. 오류가 최대한 빨리 실패로 이어지게 짜라.
    컨텍스트에러가 더 무서우니까 -> 신뢰성, 안정성(컨텍스트 에러발생이 올라감)
2. 코드의 분리 또는 정리 - 수정되는 원인에 따라 변화율(변화율이 같은 애들끼리 코드를 모아라) 변화율의 원인 -> 수정되는 이유
3. 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우
4. 인터페이스를 일치시키면 컬렉션으로 묶을 수 있다. -> 일종의 일반화 -> 서로 다른 형태인 경우 인터페이스를 일치시켜 일반화 한다.
5. 데이터와 데이터를 이용한 알고리즘이 이원화 되면 관리가 불가능 -> 데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공한다.
6. 꼬리최적화함수를 루프로 고칠때 기계적으로 고친다는 의미
7. 결국 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킨다.
8. 반복되는 코드를 제거하기 위해 집착하라.
*/

//  라이프 사이클, 스코프
// 라이프 사이클 : 언제까지 살아 있을 수 있는지
// 스코프 : 권한, 어느 부분까지 해당 변수를 알 수 있게 할 것인가.

// 스코프 : recursive 만 _recursive를 알고 있다.
// 라이프 사이클: 영구적
// 즉시 실행 함수를 사용하면 _recursive는 한번만 생성되고 recursive가 사라지지 않는 한 영구적으로 남는다.
// 메모리는 차지 하지만 recursive가 실행될때 매번 _recursive가 생성 되지 않으므로 연산이 더 빠르다.
const recursive = (() => {
  const _recursive = (arr, idx, acc) => (idx > -1 ? _recursive(arr, idx - 1, acc + arr[idx]) : acc);
  return (arr) => _recursive(arr, arr.length - 1, 0);
})();

// 스코프: _recursive는 recurse만 알고 있다
// 라이프 사이클: recurse가 끝나면 _recursive도 사라진다.
// 메모리는 차지 하지 않지만 recurse를 호출 하면 매번 _recursive를 만들어 내는 연산을 하기 때문에 더 느리다.
const recurse = (arr) => {
  const _recursive = (arr, idx, acc) => (idx > -1 ? _recursive(arr, idx - 1, acc + arr[idx]) : acc);
  return _recursive(arr, arr.length - 1, 0);
};

const log = (list, cb) => {
  console.time();
  for (let i = 0; i < 10000; i += 1) {
    cb(list);
  }
  console.timeEnd();
};

// log(arr, recursive);
// log(arr, recurse);

/*
1. 오류와 실패의 관계 - 오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있다. 오류가 최대한 빨리 실패로 이어지게 짜라.
    컨텍스트에러가 더 무서우니까 -> 신뢰성, 안정성(컨텍스트 에러발생이 올라감)
2. 코드의 분리 또는 정리 - 수정되는 원인에 따라 변화율(변화율이 같은 애들끼리 코드를 모아라) 변화율의 원인 -> 수정되는 이유
3. 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우
4. 인터페이스를 일치시키면 컬렉션으로 묶을 수 있다. -> 일종의 일반화 -> 서로 다른 형태인 경우 인터페이스를 일치시켜 일반화 한다.
5. 데이터와 데이터를 이용한 알고리즘이 이원화 되면 관리가 불가능 -> 데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공한다.
*/

// const validator = [(list, el) => Array.isArray(list), (list, el) => typeof el === 'number'];

// const arrSum = (() => {
//   const _recursive = (arr, idx, acc) => {
//     // data에 대한 validate 알고리즘을 제대로 사용하는지 신경을 써야 한다?
//     if (!validator.every((fn) => fn(arr, arr[idx]))) {
//       throw `invalid arguments, arr: ${arr}, el: ${arr[idx]}`;
//     }
//     return idx > -1 ? _recursive(arr, idx - 1, acc + arr[idx]) : acc;
//   };
//   return (arr) => _recursive(arr, arr.length - 1, 0);
// })();

// arrSum(1);

const validator = {
  data: [(list, el) => Array.isArray(list), (list, el) => typeof el === 'number'],
  validate(list, el) {
    return this.data.every((fn) => fn(list, el));
  },
};

const arrSum = (() => {
  const _recursive = (arr, idx, acc) => {
    // data에 대한 validate 알고리즘을 제대로 사용하는지 신경을 써야 한다?
    console.log(validator.validate(arr, arr[idx]));
    if (!validator.validate(arr, arr[idx])) {
      throw `invalid arguments, arr: ${arr}, el: ${arr[idx]}`;
    }
    return idx > -1 ? _recursive(arr, idx - 1, acc + arr[idx]) : acc;
  };
  return (arr) => _recursive(arr, arr.length - 1, 0);
})();

// 함수를 사용하는 쪽에서 내결함성을 갖춰야 한다.
// 함수 안쪽에서 내결함성을 사용하면 컨텍스트 오류를 낸다.
try {
  console.log(arrSum([1, 2]));
} catch (e) {
  console.log(e);
}
