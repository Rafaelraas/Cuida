/**
 * Serviço de Geolocalização
 * 
 * Fornece funcionalidades relacionadas a cálculos geográficos
 */
export default class GeolocationService {
  /**
   * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
   * 
   * @param lat1 - Latitude do ponto 1 (em graus)
   * @param lon1 - Longitude do ponto 1 (em graus)
   * @param lat2 - Latitude do ponto 2 (em graus)
   * @param lon2 - Longitude do ponto 2 (em graus)
   * @returns Distância em quilômetros
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // Raio da Terra em km
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return Math.round(distance * 100) / 100 // Arredondar para 2 casas decimais
  }

  /**
   * Converte graus para radianos
   * 
   * @param degrees - Ângulo em graus
   * @returns Ângulo em radianos
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  /**
   * Valida se as coordenadas são válidas
   * 
   * @param latitude - Latitude a ser validada
   * @param longitude - Longitude a ser validada
   * @returns true se válidas, false caso contrário
   */
  static isValidCoordinate(latitude: number, longitude: number): boolean {
    return (
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    )
  }

  /**
   * Calcula os limites de um quadrado ao redor de um ponto
   * Útil para otimizar queries de busca por proximidade
   * 
   * @param latitude - Latitude central
   * @param longitude - Longitude central
   * @param radiusKm - Raio em quilômetros
   * @returns Objeto com limites min e max de latitude e longitude
   */
  static getBoundingBox(latitude: number, longitude: number, radiusKm: number) {
    const latDelta = radiusKm / 111 // Aproximadamente 111 km por grau de latitude
    const lonDelta = radiusKm / (111 * Math.cos(this.toRadians(latitude)))

    return {
      minLat: latitude - latDelta,
      maxLat: latitude + latDelta,
      minLon: longitude - lonDelta,
      maxLon: longitude + lonDelta,
    }
  }

  /**
   * Geocoding: Converte endereço em coordenadas
   * 
   * TODO: Implementar integração com Google Maps API ou alternativa
   * 
   * @param address - Endereço completo
   * @returns Promise com latitude e longitude
   */
  static async geocodeAddress(address: string): Promise<{
    latitude: number
    longitude: number
  }> {
    // Placeholder para futura implementação
    // Aqui será integrado com Google Maps Geocoding API ou alternativa
    throw new Error('Geocoding não implementado ainda')
  }

  /**
   * Reverse Geocoding: Converte coordenadas em endereço
   * 
   * TODO: Implementar integração com Google Maps API ou alternativa
   * 
   * @param latitude - Latitude
   * @param longitude - Longitude
   * @returns Promise com endereço formatado
   */
  static async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<string> {
    // Placeholder para futura implementação
    // Aqui será integrado com Google Maps Geocoding API ou alternativa
    throw new Error('Reverse geocoding não implementado ainda')
  }
}
