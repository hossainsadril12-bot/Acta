# WCAG 2.1 Contrast Check

Thresholds: **AA normal** ≥ 4.5:1 · **AA large** ≥ 3:1 · **AAA normal** ≥ 7:1 · **AAA large** ≥ 4.5:1

| Pair | FG | BG | Ratio | AA normal | AA large | AAA normal | AAA large |
|---|---|---|---|---|---|---|---|
| white on primary (CTA) | `#FFFFFF` | `#723AC5` | 6.72:1 | ✅ | ✅ | ❌ | ✅ |
| white on primary-hover | `#FFFFFF` | `#5E2BAA` | 8.74:1 | ✅ | ✅ | ✅ | ✅ |
| primary text/link on white | `#723AC5` | `#FFFFFF` | 6.72:1 | ✅ | ✅ | ❌ | ✅ |
| ink on white | `#120B20` | `#FFFFFF` | 19.19:1 | ✅ | ✅ | ✅ | ✅ |
| text-sub on white | `#4A4458` | `#FFFFFF` | 9.3:1 | ✅ | ✅ | ✅ | ✅ |
| text-soft on white | `#6E6880` | `#FFFFFF` | 5.31:1 | ✅ | ✅ | ❌ | ✅ |
| primary on tint chip | `#723AC5` | `#F4EFFF` | 5.96:1 | ✅ | ✅ | ❌ | ✅ |
| ink on tint | `#120B20` | `#F4EFFF` | 17.03:1 | ✅ | ✅ | ✅ | ✅ |
| dark text on base | `#F4EFFF` | `#120B20` | 17.03:1 | ✅ | ✅ | ✅ | ✅ |
| dark text-sub on base | `#B8B0CC` | `#120B20` | 9.25:1 | ✅ | ✅ | ✅ | ✅ |
| dark text-soft on base | `#8D84A3` | `#120B20` | 5.45:1 | ✅ | ✅ | ❌ | ✅ |
| accent on base | `#B78AF7` | `#120B20` | 7.3:1 | ✅ | ✅ | ✅ | ✅ |
| accent on elevated | `#B78AF7` | `#1D1432` | 6.67:1 | ✅ | ✅ | ❌ | ✅ |
| dark text-sub on elevated | `#B8B0CC` | `#1D1432` | 8.44:1 | ✅ | ✅ | ✅ | ✅ |
| ink on accent (dark CTA) | `#120B20` | `#B78AF7` | 7.3:1 | ✅ | ✅ | ✅ | ✅ |
| success on white | `#1B7F4B` | `#FFFFFF` | 5.02:1 | ✅ | ✅ | ❌ | ✅ |
| success on elevated | `#5FD39A` | `#1D1432` | 9.41:1 | ✅ | ✅ | ✅ | ✅ |
| error on white | `#B42318` | `#FFFFFF` | 6.57:1 | ✅ | ✅ | ❌ | ✅ |
