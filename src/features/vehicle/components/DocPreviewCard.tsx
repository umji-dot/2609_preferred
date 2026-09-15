import type { ReactNode } from 'react';
import { Box, Stack, Icon } from 'fms-staff-design-system';

export type DocPreviewCardVariant = 'view' | 'upload';
export type DocPreviewCardSize = 'sm' | 'md';

export interface DocPreviewCardProps {
  variant: DocPreviewCardVariant;
  title: string;
  caption?: ReactNode;
  icon?: string;
  size?: DocPreviewCardSize;
  onClick?: () => void;
}

export function DocPreviewCard({
  variant,
  title,
  caption,
  icon,
  size = 'sm',
  onClick,
}: DocPreviewCardProps) {
  const padding = size === 'md' ? 32 : 16;
  const iconName = icon ?? (variant === 'view' ? 'description' : 'cloud_upload');
  const border =
    variant === 'upload' ? 'border border-dashed border-gray-300' : '';
  const cursor = onClick ? 'cursor-pointer' : '';

  return (
    <Box
      onClick={onClick}
      paddingX={padding}
      paddingY={padding}
      className={`bg-gray-50 rounded-md text-center ${border} ${cursor}`.trim()}
    >
      <Stack direction="column" align="center">
        <Box className="text-gray-500 inline-flex">
          <Icon name={iconName} size={32} filled decorative />
        </Box>
        <Box className="text-sm-medium text-gray-950">{title}</Box>
        {caption && (
          <Box marginTop={4} className="text-xs-regular text-gray-500">
            {caption}
          </Box>
        )}
      </Stack>
    </Box>
  );
}
