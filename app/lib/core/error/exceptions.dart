/// Thrown by datasources. Repository implementations are the only place that
/// catch these and turn them into `Failure`s.
class ServerException implements Exception {
  const ServerException(this.message, {this.code});

  final String message;
  final String? code;

  @override
  String toString() => 'ServerException($code)';
}

class NetworkException implements Exception {
  const NetworkException();

  @override
  String toString() => 'NetworkException';
}

class CacheException implements Exception {
  const CacheException([this.message = '']);

  final String message;

  @override
  String toString() => 'CacheException';
}
