import 'package:flutter/material.dart';
import 'jb_tokens.g.dart';
export 'jb_tokens.g.dart';

ThemeData jbTheme(Brightness brightness) {
  final c = brightness == Brightness.dark ? JbColors.dark : JbColors.light;
  final base = ThemeData(
    brightness: brightness,
    useMaterial3: true,
    fontFamily: JbType.uiFamily,
    fontFamilyFallback: const ['Noto Sans SC'],
    scaffoldBackgroundColor: c['window'],
    splashFactory: NoSplash.splashFactory,
    extensions: [c],
    colorScheme: ColorScheme(
      brightness: brightness,
      primary: c['accent'],
      onPrimary: c['onAccent'],
      primaryContainer: c['selection'],
      onPrimaryContainer: c['text'],
      secondary: c['accent'],
      onSecondary: c['onAccent'],
      secondaryContainer: c['selection'],
      onSecondaryContainer: c['text'],
      tertiary: c['accent'],
      onTertiary: c['onAccent'],
      tertiaryContainer: c['selection'],
      onTertiaryContainer: c['text'],
      surface: c['panel'],
      onSurface: c['text'],
      onSurfaceVariant: c['muted'],
      surfaceDim: c['window'],
      surfaceBright: c['editor'],
      surfaceContainerLowest: c['editor'],
      surfaceContainerLow: c['panel'],
      surfaceContainer: c['dialog'],
      surfaceContainerHigh: c['raised'],
      surfaceContainerHighest: c['popup'],
      error: c['error'],
      onError: c['editor'],
      errorContainer: c['errorBackground'],
      onErrorContainer: c['text'],
      surfaceTint: Colors.transparent,
      outline: c['border'],
      outlineVariant: c['borderDisabled'],
      inverseSurface: c['text'],
      onInverseSurface: c['editor'],
      inversePrimary: c['editor'],
      shadow: c['scrim'],
      scrim: c['scrim'],
      primaryFixed: c['selection'],
      primaryFixedDim: c['selectionInactive'],
      onPrimaryFixed: c['text'],
      onPrimaryFixedVariant: c['text'],
      secondaryFixed: c['selection'],
      secondaryFixedDim: c['selectionInactive'],
      onSecondaryFixed: c['text'],
      onSecondaryFixedVariant: c['text'],
      tertiaryFixed: c['selection'],
      tertiaryFixedDim: c['selectionInactive'],
      onTertiaryFixed: c['text'],
      onTertiaryFixedVariant: c['text'],
    ),
  );
  final ui = TextStyle(
    fontFamily: JbType.uiFamily,
    fontFamilyFallback: const ['Noto Sans SC'],
    fontSize: JbType.uiSize,
    height: 1.5,
    color: c['text'],
  );
  final small = ui.copyWith(fontSize: JbType.smallSize, color: c['muted']);
  final heading = ui.copyWith(
    fontSize: JbType.headingSize,
    height: 1.4,
    fontWeight: FontWeight.w600,
  );
  return base.copyWith(
    textTheme: TextTheme(
      displayLarge: heading,
      displayMedium: heading,
      displaySmall: heading,
      headlineLarge: heading,
      headlineMedium: heading,
      headlineSmall: heading,
      titleLarge: heading,
      titleMedium: heading,
      titleSmall: ui.copyWith(fontWeight: FontWeight.w600),
      bodyLarge: ui,
      bodyMedium: ui,
      bodySmall: small,
      labelLarge: ui,
      labelMedium: small,
      labelSmall: small,
    ),
    iconTheme: IconThemeData(size: 16, color: c['icon']),
    dividerTheme: DividerThemeData(
      color: c['borderDisabled'],
      thickness: JbMetrics.borderWidth,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: c['control'],
      isDense: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
      hintStyle: TextStyle(fontSize: JbType.uiSize, color: c['muted']),
      errorStyle: small.copyWith(color: c['error']),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        borderSide: BorderSide(color: c['border']),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        borderSide: BorderSide(color: c['border']),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        borderSide: BorderSide(color: c['focus'], width: JbMetrics.focusWidth),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        borderSide: BorderSide(color: c['error']),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        borderSide: BorderSide(color: c['error'], width: 2),
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: c['dialog'],
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(JbMetrics.islandRadius),
      ),
    ),
    popupMenuTheme: PopupMenuThemeData(
      color: c['popup'],
      surfaceTintColor: Colors.transparent,
      elevation: 2,
      shadowColor: c['scrim'],
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        side: BorderSide(color: c['popupBorder']),
      ),
    ),
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith(
        (s) => s.contains(WidgetState.selected) ? c['accent'] : c['control'],
      ),
      checkColor: WidgetStatePropertyAll(c['onAccent']),
    ),
  );
}

class JbIsland extends StatelessWidget {
  const JbIsland({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(16),
  });
  final Widget child;
  final EdgeInsetsGeometry padding;
  @override
  Widget build(BuildContext context) => Container(
    padding: padding,
    decoration: BoxDecoration(
      color: Theme.of(context).extension<JbColors>()!['panel'],
      borderRadius: BorderRadius.circular(JbMetrics.islandRadius),
    ),
    child: child,
  );
}

class JbButton extends StatelessWidget {
  const JbButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.primary = false,
    this.touch = true,
  });
  final String label;
  final VoidCallback? onPressed;
  final bool primary, touch;
  @override
  Widget build(BuildContext context) {
    final c = Theme.of(context).extension<JbColors>()!;
    return OutlinedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        animationDuration: Duration.zero,
        minimumSize: WidgetStatePropertyAll(
          Size(
            JbMetrics.buttonMinWidth,
            touch ? JbMetrics.touchTarget : JbMetrics.controlHeight,
          ),
        ),
        padding: const WidgetStatePropertyAll(
          EdgeInsets.symmetric(horizontal: 12, vertical: 3),
        ),
        shape: WidgetStatePropertyAll(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
          ),
        ),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        foregroundColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.disabled)
              ? c['disabled']
              : primary
              ? c['onAccent']
              : c['text'],
        ),
        backgroundColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.disabled)
              ? c['control']
              : primary
              ? c[s.contains(WidgetState.hovered) ||
                        s.contains(WidgetState.pressed)
                    ? 'accentHover'
                    : 'accent']
              : c['control'],
        ),
        side: WidgetStateProperty.resolveWith(
          (s) => BorderSide(
            color: s.contains(WidgetState.focused)
                ? c[primary ? 'onAccent' : 'focus']
                : s.contains(WidgetState.disabled)
                ? c['borderDisabled']
                : primary
                ? c['accent']
                : c['border'],
            width: s.contains(WidgetState.focused)
                ? JbMetrics.focusWidth
                : JbMetrics.borderWidth,
          ),
        ),
        overlayColor: WidgetStateProperty.resolveWith(
          (s) => primary
              ? Colors.transparent
              : s.contains(WidgetState.pressed)
              ? c['pressed']
              : s.contains(WidgetState.hovered)
              ? c['hover']
              : Colors.transparent,
        ),
      ),
      child: Text(label),
    );
  }
}

class JbField extends StatelessWidget {
  const JbField({
    super.key,
    required this.label,
    required this.controller,
    this.error,
    this.onChanged,
  });
  final String label;
  final TextEditingController controller;
  final String? error;
  final ValueChanged<String>? onChanged;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label),
        const SizedBox(height: 4),
        Semantics(
          label: label,
          child: TextField(
            controller: controller,
            onChanged: onChanged,
            style: Theme.of(context).textTheme.bodyMedium,
            decoration: InputDecoration(errorText: error),
          ),
        ),
      ],
    ),
  );
}

class JbBanner extends StatelessWidget {
  const JbBanner({super.key, required this.message, this.kind = 'success'});
  final String message, kind;
  @override
  Widget build(BuildContext context) {
    final c = Theme.of(context).extension<JbColors>()!;
    return Semantics(
      liveRegion: true,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: c['${kind}Background'],
          borderRadius: BorderRadius.circular(JbMetrics.controlRadius),
        ),
        child: Text(message, style: Theme.of(context).textTheme.bodyMedium),
      ),
    );
  }
}
