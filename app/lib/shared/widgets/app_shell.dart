import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../core/constants/app_colors.dart';
import '../../core/constants/app_motion.dart';
import '../../core/constants/app_radius.dart';
import '../../core/constants/app_shadows.dart';
import '../../core/constants/app_sizes.dart';
import '../../core/constants/app_spacing.dart';
import '../../core/constants/app_strings.dart';
import '../../core/constants/app_text_styles.dart';

/// Tab scaffold with the floating frosted nav pill (UI spec §3.1).
/// Each tab is a `StatefulShellBranch`, so every tab keeps its own stack.
class AppShell extends StatelessWidget {
  const AppShell({super.key, required this.navigationShell});

  final StatefulNavigationShell navigationShell;

  // Order matches the shell branches in AppRouter.
  static const List<_NavTab> _tabs = [
    _NavTab(AppStrings.tabHome, LucideIcons.house300, LucideIcons.house),
    _NavTab(AppStrings.tabHearts, LucideIcons.heart300, LucideIcons.heart),
    _NavTab(AppStrings.tabMood, LucideIcons.smile300, LucideIcons.smile),
    _NavTab(
      AppStrings.tabUsTime,
      LucideIcons.calendar300,
      LucideIcons.calendar,
    ),
    _NavTab(AppStrings.tabProfile, LucideIcons.user300, LucideIcons.user),
  ];

  void _onTap(int index) {
    // Tapping the active tab again returns it to its first page.
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      body: navigationShell,
      bottomNavigationBar: _NavPill(
        tabs: _tabs,
        currentIndex: navigationShell.currentIndex,
        onTap: _onTap,
      ),
    );
  }
}

class _NavTab {
  const _NavTab(this.label, this.icon, this.activeIcon);

  final String label;
  final IconData icon; // 1.5px stroke
  final IconData activeIcon; // 2px stroke
}

class _NavPill extends StatelessWidget {
  const _NavPill({
    required this.tabs,
    required this.currentIndex,
    required this.onTap,
  });

  final List<_NavTab> tabs;
  final int currentIndex;
  final ValueChanged<int> onTap;

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.viewPaddingOf(context).bottom;
    final borderRadius = BorderRadius.circular(AppRadius.pill);

    return Padding(
      padding: EdgeInsets.fromLTRB(
        AppSizes.navBarBottomGap,
        0,
        AppSizes.navBarBottomGap,
        AppSizes.navBarBottomGap + bottomInset,
      ),
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: borderRadius,
          boxShadow: AppShadows.navBar,
        ),
        child: ClipRRect(
          borderRadius: borderRadius,
          child: BackdropFilter(
            filter: ImageFilter.blur(
              sigmaX: AppSizes.blurNavBar,
              sigmaY: AppSizes.blurNavBar,
            ),
            child: Container(
              height: AppSizes.navBarHeight,
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.sm),
              decoration: BoxDecoration(
                color: AppColors.navBar,
                borderRadius: borderRadius,
                border: Border.all(
                  color: AppColors.navBarBorder,
                  width: AppSizes.hairline,
                ),
              ),
              child: Row(
                children: [
                  for (var i = 0; i < tabs.length; i++)
                    Expanded(
                      child: _NavItem(
                        tab: tabs[i],
                        isActive: i == currentIndex,
                        onTap: () => onTap(i),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.tab,
    required this.isActive,
    required this.onTap,
  });

  final _NavTab tab;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final color = isActive ? AppColors.dustyRose : AppColors.textSecondary;

    return Semantics(
      button: true,
      selected: isActive,
      label: tab.label,
      excludeSemantics: true,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        // Fill the pill's height so the indicator sits below the label, not over it.
        child: Stack(
          fit: StackFit.expand,
          alignment: Alignment.center,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TweenAnimationBuilder<Color?>(
                  tween: ColorTween(end: color),
                  duration: AppDurations.quick,
                  curve: AppCurves.standard,
                  builder: (context, value, _) => Icon(
                    isActive ? tab.activeIcon : tab.icon,
                    size: AppSizes.iconNav,
                    color: value,
                  ),
                ),
                AnimatedSize(
                  duration: AppDurations.quick,
                  curve: AppCurves.decelerate,
                  child: isActive
                      ? Padding(
                          padding: const EdgeInsets.only(top: AppSpacing.xxs),
                          child: Text(
                            tab.label,
                            maxLines: 1,
                            style: AppTextStyles.caption.copyWith(
                              color: AppColors.dustyRose,
                              fontWeight: FontWeight.w500,
                              letterSpacing: 0,
                            ),
                          ),
                        )
                      : const SizedBox.shrink(),
                ),
              ],
            ),
            Positioned(
              bottom: AppSpacing.xxs,
              child: AnimatedOpacity(
                opacity: isActive ? 1 : 0,
                duration: AppDurations.quick,
                curve: AppCurves.standard,
                child: Container(
                  width: AppSizes.navIndicatorWidth,
                  height: AppSizes.navIndicatorHeight,
                  decoration: BoxDecoration(
                    color: AppColors.dustyRose,
                    borderRadius: BorderRadius.circular(AppRadius.full),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
