export class Problem4 {
  static sum_to_n_a(n: number): number {
    // we can use recursion for calculating,
    // cons is tt's easy over stack size exceeded
    if (n <= 0) return 0;
    if (n > 1) return n + this.sum_to_n_a(n - 1);
    return n;
  }

  static sum_to_n_b(n: number): number {
    // Use loop for replace recursion that will help optimize performance , it will take less cpu performance than recursion function
    var result: number = 0;
    if (n <= 0) return result;
    for (var i = 1; i <= n; i++) result += i;
    return result;
  }

  static sum_to_n_c(n: number): number {
    // We can use formula for sum N , This is best way that help optimize code and performance, speed
    var result: number = 0;
    if (n <= 0) return result;
    result = (n * (n + 1)) / 2;
    return result;
  }
}
