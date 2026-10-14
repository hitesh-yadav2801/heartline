/// Build-time configuration from `--dart-define`.
///
/// `USE_MOCKS` defaults to `true`: Part A builds every screen on mock datasources.
class AppConfig {
  const AppConfig({required this.useMocks});

  factory AppConfig.fromEnvironment() =>
      const AppConfig(useMocks: bool.fromEnvironment('USE_MOCKS', defaultValue: true));

  final bool useMocks;
}
