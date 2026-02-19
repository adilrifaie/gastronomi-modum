export interface CrosswordClue {
    number: number;
    clue: string;
    answer: string;
    direction: 'across' | 'down';
    startRow: number;
    startCol: number;
}

export interface CellData {
    row: number;
    col: number;
    letter: string;
    number?: number;
    isBlack: boolean;
}

// Grid: 9 rows x 13 cols (0-indexed)
export const GRID_ROWS = 9;
export const GRID_COLS = 13;

export const clues: CrosswordClue[] = [
    // Across (Sağdan Sola)
    {
        number: 1,
        clue: 'Beslenme amaçlı mideye açılan açıklığın adı',
        answer: 'GASTROSTOMI',
        direction: 'across',
        startRow: 1,
        startCol: 2,
    },
    {
        number: 2,
        clue: 'Burundan mideye kadar uzanan beslenme tüpü',
        answer: 'NAZOGASTRIK',
        direction: 'across',
        startRow: 3,
        startCol: 0,
    },
    {
        number: 3,
        clue: 'Genel anestezi altında endoskop kullanılarak tüpün yerleştirilme',
        answer: 'PEG',
        direction: 'across',
        startRow: 7,
        startCol: 5,
    },
    {
        number: 4,
        clue: 'Mikroorganizmalardan arındırılmış olan',
        answer: 'STERIL',
        direction: 'across',
        startRow: 5,
        startCol: 4,
    },
    // Down (Yukarıdan Aşağı)
    {
        number: 1,
        clue: 'Beslenme ürününün belirli bir zaman aralığında şırıngayla sabit hızla ve yavaşça verilmesi',
        answer: 'BOLUS',
        direction: 'down',
        startRow: 0,
        startCol: 7,
    },
    {
        number: 2,
        clue: 'Gastrostomir tüpüyle yapılan beslenme tipinin adı',
        answer: 'ENTERAL',
        direction: 'down',
        startRow: 1,
        startCol: 2,
    },
];

// Build the initial grid from clues
export function buildGrid(): CellData[][] {
    const grid: CellData[][] = Array.from({ length: GRID_ROWS }, (_, r) =>
        Array.from({ length: GRID_COLS }, (_, c) => ({
            row: r,
            col: c,
            letter: '',
            isBlack: true,
        }))
    );

    // Place each answer in the grid
    for (const clue of clues) {
        for (let i = 0; i < clue.answer.length; i++) {
            const r = clue.direction === 'down' ? clue.startRow + i : clue.startRow;
            const c = clue.direction === 'across' ? clue.startCol + i : clue.startCol;
            if (r < GRID_ROWS && c < GRID_COLS) {
                grid[r][c].isBlack = false;
                grid[r][c].letter = clue.answer[i];
            }
        }
        // Mark the number at the start cell
        const sr = clue.startRow;
        const sc = clue.startCol;
        if (sr < GRID_ROWS && sc < GRID_COLS) {
            grid[sr][sc].number = clue.number;
        }
    }

    return grid;
}
