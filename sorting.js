// Career Sorter Class - Advanced Sorting and Filtering Module
class CareerSorter {
    constructor() {
        this.careers = [];
        this.filters = {
            stream: '',
            domain: '',
            salary: '',
            search: '',
            demand: ''
        };
    }

    // Sort careers by demand level (Very High → High → Medium → Low)
    sortByDemand(careers) {
        const demandOrder = {
            'Very High': 1,
            'High': 2,
            'Medium': 3,
            'Low': 4
        };
        return [...careers].sort((a, b) => 
            demandOrder[a.demandLevel] - demandOrder[b.demandLevel]
        );
    }

    // Sort careers by salary (descending or ascending)
    sortBySalary(careers, order = 'desc') {
        const sorted = [...careers].sort((a, b) => 
            order === 'desc' ? b.avgSalary - a.avgSalary : a.avgSalary - b.avgSalary
        );
        return sorted;
    }

    // Sort careers by name (alphabetical)
    sortByName(careers, order = 'asc') {
        return [...careers].sort((a, b) =>
            order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    }

    // Filter careers by stream
    filterByStream(careers, stream) {
        if (!stream) return careers;
        return careers.filter(c => c.stream === stream);
    }

    // Filter careers by domain
    filterByDomain(careers, domain) {
        if (!domain) return careers;
        return careers.filter(c => c.domain === domain);
    }

    // Filter careers by salary range (in lakhs)
    filterBySalary(careers, range) {
        if (!range) return careers;
        const ranges = {
            '0-10': [0, 10],
            '10-15': [10, 15],
            '15-20': [15, 20],
            '20+': [20, Infinity]
        };
        const [min, max] = ranges[range];
        return careers.filter(c => {
            const salaryInLakhs = c.avgSalary / 100000;
            return salaryInLakhs >= min && salaryInLakhs <= max;
        });
    }

    // Search careers by name, description, or skills
    search(careers, query) {
        if (!query) return careers;
        const lowerQuery = query.toLowerCase();
        return careers.filter(c =>
            c.name.toLowerCase().includes(lowerQuery) ||
            c.description.toLowerCase().includes(lowerQuery) ||
            c.skills.toLowerCase().includes(lowerQuery)
        );
    }

    // Apply multiple filters at once
    applyFilters(careers, filters) {
        let filtered = careers;
        
        if (filters.stream) filtered = this.filterByStream(filtered, filters.stream);
        if (filters.domain) filtered = this.filterByDomain(filtered, filters.domain);
        if (filters.salary) filtered = this.filterBySalary(filtered, filters.salary);
        if (filters.search) filtered = this.search(filtered, filters.search);
        
        return filtered;
    }

    // Get unique streams from careers list
    getStreams(careers) {
        return [...new Set(careers.map(c => c.stream))];
    }

    // Get unique domains from careers list
    getDomains(careers) {
        return [...new Set(careers.map(c => c.domain).filter(Boolean))];
    }

    // Compare two careers
    compare(career1, career2) {
        return {
            nameComparison: career1.name === career2.name,
            salaryDifference: Math.abs(career1.avgSalary - career2.avgSalary),
            demandComparison: career1.demandLevel === career2.demandLevel,
            skillsOverlap: this.calculateSkillOverlap(career1.skills, career2.skills)
        };
    }

    // Calculate skill overlap percentage between two careers
    calculateSkillOverlap(skills1, skills2) {
        const s1 = new Set(skills1.split(',').map(s => s.trim().toLowerCase()));
        const s2 = new Set(skills2.split(',').map(s => s.trim().toLowerCase()));
        const overlap = [...s1].filter(skill => s2.has(skill));
        return (overlap.length / Math.min(s1.size, s2.size)) * 100;
    }

    // Sort by multiple criteria (primary, secondary, tertiary)
    sortByMultiple(careers, primarySort = 'demand', secondarySort = 'salary') {
        let sorted = careers;
        
        if (primarySort === 'demand') {
            sorted = this.sortByDemand(sorted);
        } else if (primarySort === 'salary') {
            sorted = this.sortBySalary(sorted, 'desc');
        } else if (primarySort === 'name') {
            sorted = this.sortByName(sorted);
        }
        
        return sorted;
    }

    // Get careers matching specific criteria
    findMatching(careers, minSalary = 0, maxSalary = Infinity, demands = []) {
        return careers.filter(c => {
            const salary = c.avgSalary;
            const demandMatch = demands.length === 0 || demands.includes(c.demandLevel);
            return salary >= minSalary && salary <= maxSalary && demandMatch;
        });
    }

    // Calculate average salary for a group of careers
    calculateAverageSalary(careers) {
        if (careers.length === 0) return 0;
        return careers.reduce((sum, c) => sum + c.avgSalary, 0) / careers.length;
    }

    // Get top careers by demand
    getTopDemandCareers(careers, limit = 5) {
        return this.sortByDemand(careers).slice(0, limit);
    }

    // Get top careers by salary
    getTopSalaryCareers(careers, limit = 5) {
        return this.sortBySalary(careers, 'desc').slice(0, limit);
    }
}

// Create global sorter instance
const sorter = new CareerSorter();

// Usage Examples (for reference):
/*
// Sort by demand
const sorted = sorter.sortByDemand(careers);

// Sort by salary (descending)
const bySalary = sorter.sortBySalary(careers, 'desc');

// Filter by stream and domain
const filtered = sorter.applyFilters(careers, {
    stream: 'Engineering',
    domain: 'IT'
});

// Search
const searchResults = sorter.search(careers, 'developer');

// Get top demanding careers
const topDemand = sorter.getTopDemandCareers(careers, 5);

// Compare two careers
const comparison = sorter.compare(career1, career2);
*/
