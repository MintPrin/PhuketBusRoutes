import { busRoutes, routeRecommendations, type BusRoute, type InsertBusRoute, type RouteRecommendation, type InsertRouteRecommendation } from "@shared/schema";

export interface IStorage {
  getAllBusRoutes(): Promise<BusRoute[]>;
  getBusRouteByRouteId(routeId: string): Promise<BusRoute | undefined>;
  createBusRoute(route: InsertBusRoute): Promise<BusRoute>;
  createRouteRecommendation(recommendation: InsertRouteRecommendation): Promise<RouteRecommendation>;
  getRecommendationHistory(): Promise<RouteRecommendation[]>;
}

export class MemStorage implements IStorage {
  private busRoutes: Map<number, BusRoute>;
  private routeRecommendations: Map<number, RouteRecommendation>;
  private currentBusRouteId: number;
  private currentRecommendationId: number;

  constructor() {
    this.busRoutes = new Map();
    this.routeRecommendations = new Map();
    this.currentBusRouteId = 1;
    this.currentRecommendationId = 1;
    
    // Initialize with the three main Phuket bus routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const routes: InsertBusRoute[] = [
      {
        routeId: "P1",
        name: {
          en: "Smart Bus (Light Blue)",
          th: "รถเมล์สมาร์ท (สีฟ้าอ่อน)"
        },
        color: "#60A5FA",
        description: {
          en: "Airport → Beach Areas (Surin, Patong, Karon, Kata, Rawai)",
          th: "สนามบิน → พื้นที่ชายหาด (สุรินทร์, ป่าตอง, กะรน, กะตะ, ราไวย์)"
        },
        stops: [
          { en: "Phuket International Airport", th: "สนามบินภูเก็ต" },
          { en: "Thalang Public Health Office", th: "สำนักงานสาธารณสุขถลาง" },
          { en: "Cherng Thalay Wittayakom School", th: "โรงเรียนเชิงทะเลวัทยาคมฯ" },
          { en: "Tesco Lotus Cherngtalay", th: "เทสโก้โลตัสเชิงทะเล" },
          { en: "Surin Beach", th: "หาดสุรินทร์" },
          { en: "Phuket Fantasea", th: "ภูเก็ตแฟนตาซี" },
          { en: "Big C Kamala", th: "บิ๊กซีกมลา" },
          { en: "Patong Provincial Electricity Authority", th: "การไฟฟ้าป่าตอง" },
          { en: "Karon Circle", th: "วงเวียนกะรน" },
          { en: "Kata Night Plaza", th: "กะตะไนท์พลาซ่า" },
          { en: "Rawai Beach", th: "หาดราไวย์" }
        ],
        schedules: {
          outbound: {
            times: ["08:15", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "14:30", "15:00", "16:00", "16:30", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "22:40", "23:30"],
            origin: "Phuket International Airport",
            destination: "Beach Areas (Surin, Patong, Karon, Kata, Rawai)",
            available: true
          },
          inbound: {
            times: [],
            origin: "Beach Areas",
            destination: "Phuket International Airport",
            available: false
          }
        }
      },
      {
        routeId: "P2",
        name: {
          en: "Airport Bus to Town (Orange)",
          th: "รถเมล์สนามบินสู่เมือง (สีส้ม)"
        },
        color: "#FB923C",
        description: {
          en: "Airport → Phuket Town via Central areas",
          th: "สนามบิน → เมืองภูเก็ต ผ่านพื้นที่กลาง"
        },
        stops: [
          { en: "Phuket International Airport", th: "สนามบินภูเก็ต" },
          { en: "Naiyang Beach", th: "หาดในยาง" },
          { en: "Thalang", th: "อำเภอถลาง" },
          { en: "Monument", th: "อนุเสาวรีย์" },
          { en: "Boat Lagoon", th: "โบ๊ทลากูน" },
          { en: "Bypass", th: "บายพาส" },
          { en: "Central-Big C-Lotus", th: "เซ็นทรัล-บิ๊กซี-โลตั๊ส" },
          { en: "Surakul Stadium", th: "สนามสุระกุล" },
          { en: "Rung Hill", th: "เขารัง" },
          { en: "Phuket Town", th: "เมืองภูเก็ต" },
          { en: "Phuket Bus Terminal 1", th: "บขส.1" }
        ],
        schedules: {
          outbound: {
            times: ["06:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:00", "17:00", "18:00", "19:00", "19:45", "20:30", "21:15", "22:00", "22:30"],
            origin: "Phuket International Airport",
            destination: "Phuket Town via Central areas",
            available: true
          },
          inbound: {
            times: ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "15:45", "16:15", "17:00", "17:45", "18:30", "19:15", "20:00"],
            origin: "Phuket Bus Terminal 1",
            destination: "Phuket International Airport",
            available: true
          }
        }
      },
      {
        routeId: "P3",
        name: {
          en: "Airport Express (Dark Blue)",
          th: "รถเมล์สนามบินด่วน (สีน้ำเงินเข้ม)"
        },
        color: "#1E40AF",
        description: {
          en: "Airport → Patong, Karon, Kata (Express)",
          th: "สนามบิน → ป่าตอง, กะรน, กะตะ (ด่วน)"
        },
        stops: [
          { en: "Phuket International Airport", th: "สนามบินภูเก็ต" },
          { en: "Muang Mai", th: "เมืองใหม่" },
          { en: "Baan Kean", th: "บ้านเคียน" },
          { en: "Baan Pon", th: "บ้านพอน" },
          { en: "Monument", th: "อนุเสาวรีย์" },
          { en: "Boat Lagoon", th: "โบ๊ทลากูน" },
          { en: "Lotus", th: "โลตัส" },
          { en: "Kathu", th: "กะทู้" },
          { en: "Patong", th: "ป่าตอง" },
          { en: "Karon", th: "กะรน" },
          { en: "Kata", th: "กะตะ" }
        ],
        schedules: {
          outbound: {
            times: ["08:45", "09:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45"],
            origin: "Phuket International Airport",
            destination: "Patong, Karon, Kata (Express)",
            available: true
          },
          inbound: {
            times: [],
            origin: "Kata/Karon/Patong",
            destination: "Phuket International Airport",
            available: false
          }
        }
      }
    ];

    routes.forEach(route => {
      this.createBusRoute(route);
    });
  }

  async getAllBusRoutes(): Promise<BusRoute[]> {
    return Array.from(this.busRoutes.values());
  }

  async getBusRouteByRouteId(routeId: string): Promise<BusRoute | undefined> {
    return Array.from(this.busRoutes.values()).find(route => route.routeId === routeId);
  }

  async createBusRoute(insertRoute: InsertBusRoute): Promise<BusRoute> {
    const id = this.currentBusRouteId++;
    const route: BusRoute = { ...insertRoute, id };
    this.busRoutes.set(id, route);
    return route;
  }

  async createRouteRecommendation(insertRecommendation: InsertRouteRecommendation): Promise<RouteRecommendation> {
    const id = this.currentRecommendationId++;
    const recommendation: RouteRecommendation = { 
      ...insertRecommendation, 
      id,
      createdAt: new Date()
    };
    this.routeRecommendations.set(id, recommendation);
    return recommendation;
  }

  async getRecommendationHistory(): Promise<RouteRecommendation[]> {
    return Array.from(this.routeRecommendations.values());
  }
}

export const storage = new MemStorage();
