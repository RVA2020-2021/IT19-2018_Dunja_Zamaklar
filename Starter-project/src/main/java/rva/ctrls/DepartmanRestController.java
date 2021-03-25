package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Departman;
import rva.repository.DepartmanRepository;

@RestController
public class DepartmanRestController {
	
	/*injektovanje zavisnosti ->
	 1)korz konstruktor
	 2) kroz setter
	 3) kroz neko polje, navodjenjem anotacije omogucava instanciranje interfejsa
	 */
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	@GetMapping("Departman")
	public Collection<Departman> getDepartmani()
	{
		return departmanRepository.findAll();
	}
	
	@GetMapping("Departman/{id}")
	public Departman getDepartman(@PathVariable("id")Integer id)
	{
		return departmanRepository.getOne(id);
	}
	
	@GetMapping("DepartmanNaziv/{naziv}")
	public Collection<Departman> getDepartmanByNaziv(@PathVariable("naziv")String naziv)
	{
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}
}
