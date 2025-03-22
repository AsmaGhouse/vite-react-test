import { determinePurposeType, determineTransactionType } from "@/utils/getTransactionConfigTypes";

export const getTransactionTableColumns = () => [
    {
      key: "niumId",
      id: "niumId",
      name: "Nium ID",
      cell: (value: string) => (
        <span
          className="text-pink-600"
        >
          {value}
        </span>
      ),
    },
    {
      key: "orderDate",
      id: "orderDate",
      name: "Order Date",
    },
    {
      key: "agentId",
      id: "agentId",
      name: "Agent ID",
    },
    {
      key: "customerPan",
      id: "customerPan",
      name: "Customer PAN",
    },
    {
      key: "transactionType",
      id: "transactionType",
      name: "Transaction Type",
       cell: (_: unknown, rowData: any) =>
            determineTransactionType(rowData.transactionType),
    },
    {
      key: "purposeType",
      id: "purposeType",
      name: "Purpose Type",
      cell: (_: unknown, rowData: any) =>
            determinePurposeType(rowData.purposeType),
    },
    {
      key: "esignStatus",
      id: "esignStatus",
      name: "E-Sign Status",
    },
    {
      key: "esignStatusCompletionDate",
      id: "esignStatusCompletionDate",
      name: "E-Sign Status Completion Date",
    },
    {
      key: "vkycStatus",
      id: "vkycStatus",
      name: "VKYC Status",
    },
    {
      key: "vkycCompletionDate",
      id: "vkycCompletionDate",
      name: "VKYC Completion Date",
    },
    {
      key: "incidentStatus",
      id: "incidentStatus",
      name: "Incident Status",
    },
    {
      key: "incidentCompletionDate",
      id: "incidentCompletionDate",
      name: "Incident Completion Date",
    },
  ];
  