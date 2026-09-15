import { useState } from 'react';
import {
  Box,
  Button,
  Icon,
  ModalListItem,
  PhotoThumbnail,
  Stack,
  TextArea,
} from 'installer-design-system';
import { MAX_UNABLE_PHOTOS, UNABLE_REASONS } from '../mocks';

export function UnableForm({ jobId }: { jobId: string }) {
  const [reason, setReason] = useState<string>('');
  const [otherDetail, setOtherDetail] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const addPhoto = () => {
    if (photos.length >= MAX_UNABLE_PHOTOS) return;
    const idx = photos.length + 1;
    setPhotos((prev) => [
      ...prev,
      `https://picsum.photos/seed/unable-${jobId}-${idx}/200/200`,
    ]);
  };

  const removePhoto = (i: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <Stack direction="column" gap={16}>
      <Stack direction="column" gap={8}>
        <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
          작업 불가 사유 <span className="text-danger">*</span>
        </Box>
        <Stack direction="column" gap={8}>
          {UNABLE_REASONS.map((opt) => (
            <ModalListItem
              key={opt.value}
              selected={reason === opt.value}
              onClick={() => setReason(opt.value)}
            >
              {opt.label}
            </ModalListItem>
          ))}
        </Stack>
      </Stack>

      {reason === 'other' && (
        <TextArea
          label="상세 사유"
          placeholder="현장 상황을 자세히 입력해 주세요."
          value={otherDetail}
          onChange={(e) => setOtherDetail(e.target.value)}
          rows={4}
        />
      )}

      <Stack direction="column" gap={12}>
        <Stack direction="row" justify="between" align="baseline">
          <Box as="h2" className="text-caption-15 font-bold text-neutral-black">
            증빙 사진 <span className="text-danger">*</span>
          </Box>
          <Box className="text-caption-15 font-regular text-neutral-500">
            {photos.length} / {MAX_UNABLE_PHOTOS}
          </Box>
        </Stack>
        <Button
          variant="primary"
          size="md"
          iconLeft={<Icon name="photo_camera" size={20} filled />}
          onClick={addPhoto}
          disabled={photos.length >= MAX_UNABLE_PHOTOS}
        >
          촬영
        </Button>
        {photos.length > 0 && (
          <Stack direction="row" gap={8} wrap>
            {photos.map((src, i) => (
              <PhotoThumbnail
                key={i}
                width={80}
                src={src}
                onDelete={() => removePhoto(i)}
              />
            ))}
          </Stack>
        )}
        <Box className="text-micro-14 font-regular text-neutral-500">
          카메라 촬영만 가능합니다. 갤러리 첨부는 지원하지 않습니다.
        </Box>
      </Stack>
    </Stack>
  );
}
