export default function BonusTable({divider}: {divider: number}) {
    const getBonus = (step: number) => {
       let methodCount = Math.pow(10, step * divider);
       methodCount = Math.round(methodCount);

       return methodCount;
    }

    return (
        <table>
            <tbody>
            <tr>
                <th>Step</th>
                <th>Bonus</th>
            </tr>
            {Array.from({ length: 5 }, (_, i) => i).map((step) => (
                <tr key={step+1}>
                    <td>{step+1}</td>
                    <td>{getBonus(step+1)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}