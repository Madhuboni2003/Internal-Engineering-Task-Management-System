export interface IPerformanceService {
    getCurrentUserPerformance(): void
    getCurrentUserTaskLevelPerformance(): void
    getCurrentUserPerformanceTrend(): void
    getAllDevelopersPerformance(): void
    getDeveloperPerformance(): void
    getDeveloperTaskLevelPerformance(): void
    getDeveloperPerformanceTrend(): void
}

export class PerformanceService implements IPerformanceService {
    getCurrentUserPerformance(): void {}

    getCurrentUserTaskLevelPerformance(): void {}

    getCurrentUserPerformanceTrend(): void {}

    getAllDevelopersPerformance(): void {}

    getDeveloperPerformance(): void {}

    getDeveloperTaskLevelPerformance(): void {}

    getDeveloperPerformanceTrend(): void {}
}