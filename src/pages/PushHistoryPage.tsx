import { useState } from 'react';
import { Box, Stack, Tabs, Pagination } from 'fms-staff-design-system';
import { AdminShell } from '../components/AdminShell';
import { PushHistoryFilterBar } from '../features/push-history/components/PushHistoryFilterBar';
import { PushHistoryTable } from '../features/push-history/components/PushHistoryTable';
import { MessageHistoryFilterBar } from '../features/push-history/components/MessageHistoryFilterBar';
import { MessageHistoryTable } from '../features/push-history/components/MessageHistoryTable';
import {
  PUSH_HISTORY_ROWS,
  PUSH_HISTORY_TOTAL_COUNT,
  MESSAGE_HISTORY_ROWS,
  MESSAGE_HISTORY_TOTAL_COUNT,
} from '../features/push-history/mocks';
import { LIST_PAGE_SIZE } from '../components/ui-rules';

const PUSH_TOTAL_PAGES = Math.ceil(PUSH_HISTORY_TOTAL_COUNT / LIST_PAGE_SIZE);
const MESSAGE_TOTAL_PAGES = Math.ceil(
  MESSAGE_HISTORY_TOTAL_COUNT / LIST_PAGE_SIZE,
);

const TAB_ITEMS = [
  { key: 'push', label: '푸시 발송 이력' },
  { key: 'message', label: '알림톡 및 SMS 발송 이력' },
];

export default function PushHistoryPage() {
  const [activeTab, setActiveTab] = useState('push');
  const [pushPage, setPushPage] = useState(1);
  const [messagePage, setMessagePage] = useState(1);

  return (
    <AdminShell>
      <Box padding={24}>
        <Stack direction="column">
          <Box as="h1" className="text-page-title text-gray-950">
            푸시 알림 발송 이력
          </Box>

          <Box marginTop={16} className="bg-white rounded-lg">
            <Box paddingX={24} paddingTop={16}>
              <Tabs
                items={TAB_ITEMS}
                activeKey={activeTab}
                onChange={setActiveTab}
                variant="line"
              />
            </Box>

            {activeTab === 'push' && (
              <>
                <PushHistoryFilterBar />
                <Box paddingX={24} paddingY={16}>
                  <PushHistoryTable
                    rows={PUSH_HISTORY_ROWS}
                    totalCount={PUSH_HISTORY_TOTAL_COUNT}
                  />
                </Box>
                <Box paddingX={24} paddingY={16}>
                  <Stack direction="row" align="center" justify="end">
                    <Pagination
                      currentPage={pushPage}
                      totalPages={PUSH_TOTAL_PAGES}
                      totalItems={PUSH_HISTORY_TOTAL_COUNT}
                      pageSize={LIST_PAGE_SIZE}
                      onChange={setPushPage}
                    />
                  </Stack>
                </Box>
              </>
            )}

            {activeTab === 'message' && (
              <>
                <MessageHistoryFilterBar />
                <Box paddingX={24} paddingY={16}>
                  <MessageHistoryTable
                    rows={MESSAGE_HISTORY_ROWS}
                    totalCount={MESSAGE_HISTORY_TOTAL_COUNT}
                    onExcelDownload={() => {
                      /* 엑셀 다운로드는 Default 툴바에 내장 (인터랙션 데모) */
                    }}
                  />
                </Box>
                <Box paddingX={24} paddingY={16}>
                  <Stack direction="row" align="center" justify="end">
                    <Pagination
                      currentPage={messagePage}
                      totalPages={MESSAGE_TOTAL_PAGES}
                      totalItems={MESSAGE_HISTORY_TOTAL_COUNT}
                      pageSize={LIST_PAGE_SIZE}
                      onChange={setMessagePage}
                    />
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Stack>
      </Box>
    </AdminShell>
  );
}
