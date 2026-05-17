import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CampaignStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Campaign {
  id: string;
  labId: string;
  labName: string;
  labEmail: string;
  title: string;
  description: string;
  discountPercent: number;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  rejectionReason?: string;
  createdAt: string;
  approvedAt?: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    labId: "lab1",
    labName: "Elite Dental Studio",
    labEmail: "info@elitelab.com",
    title: "Haziran Zirkonyum Kampanyası",
    description: "Tüm zirkonyum kaplamalarında %20 indirim! Sınırlı sayıda.",
    discountPercent: 20,
    categoryId: "zirkonyum",
    categoryName: "Zirkonyum",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    status: "PENDING",
    createdAt: "2026-05-17T10:00:00Z",
  },
  {
    id: "c2",
    labId: "lab2",
    labName: "Modern Diş Lab",
    labEmail: "info@modernlab.com",
    title: "Emax Özel Fiyat",
    description: "Emax kron ve laminalarda %15 indirim fırsatı.",
    discountPercent: 15,
    categoryId: "emax",
    categoryName: "Emax & Porselen",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600",
    startDate: "2026-05-20",
    endDate: "2026-06-20",
    status: "APPROVED",
    createdAt: "2026-05-10T08:00:00Z",
    approvedAt: "2026-05-12T14:00:00Z",
  },
];

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, "id" | "status" | "createdAt">) => void;
  approveCampaign: (id: string) => void;
  rejectCampaign: (id: string, reason: string) => void;
  getApprovedCampaigns: () => Campaign[];
  getPendingCampaigns: () => Campaign[];
  getLabCampaigns: (labEmail: string) => Campaign[];
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      campaigns: MOCK_CAMPAIGNS,

      addCampaign: (data) =>
        set((state) => ({
          campaigns: [
            ...state.campaigns,
            {
              ...data,
              id: `c_${Date.now()}`,
              status: "PENDING",
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      approveCampaign: (id) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) =>
            c.id === id
              ? { ...c, status: "APPROVED", approvedAt: new Date().toISOString() }
              : c
          ),
        })),

      rejectCampaign: (id, reason) =>
        set((state) => ({
          campaigns: state.campaigns.map((c) =>
            c.id === id ? { ...c, status: "REJECTED", rejectionReason: reason } : c
          ),
        })),

      getApprovedCampaigns: () =>
        get().campaigns.filter((c) => c.status === "APPROVED"),

      getPendingCampaigns: () =>
        get().campaigns.filter((c) => c.status === "PENDING"),

      getLabCampaigns: (labEmail) =>
        get().campaigns.filter((c) => c.labEmail === labEmail),
    }),
    { name: "dis-campaigns" }
  )
);
