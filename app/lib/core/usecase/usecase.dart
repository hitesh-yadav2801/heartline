import 'package:fpdart/fpdart.dart';

import '../error/failures.dart';

/// One class per user action. Holds no state.
abstract interface class UseCase<T, Params> {
  Future<Either<Failure, T>> call(Params params);
}

class NoParams {
  const NoParams();
}
